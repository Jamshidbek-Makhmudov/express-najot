const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fileUpload = require('express-fileupload');
const { EventEmitter } = require('events');
const ee = new EventEmitter();
const app = express();

const Io = require('../io');

const user = new Io(process.cwd() + '/database/users.json');
const join = new Io(process.cwd() + '/database/message.json');

const Create = require('../models/create');
const Join = require('../models/join');

app.use(fileUpload());
app.use(express.static(process.cwd() + '/uploads'));
app.set('view engine', 'ejs');
app.set('view', process.cwd() + '/view/index.ejs');

const photo = [];
app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', (req, res) => {
	const file = req.files.photo;
	file.mv(process.cwd() + '/uploads/' + file.name);
	photo.push(file.name);
	ee.emit('photo', { photo });
});

app.get('/', (req, res) => {
	res.render('image', { photo });
});

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', socket => {
	console.log(socket.id);
	socket.on('new-group', async ({ name, group }) => {
		console.log({ name, group });
		const users = await user.read();
		const findGroup = users.find(item => item.group == group);

		if (!findGroup) {
			const newCreate = new Create(name, group);
			const result = users.length ? [...users, newCreate] : [newCreate];
			await user.write(result);
			socket.join(group);
		} else if (users.length === 0) {
			const newCreate = new Create(name, group);
			const result = users.length ? [...users, newCreate] : [newCreate];
			await user.write(result);
			socket.join(group);
		}
		io.emit('groups', { group });
	});

	socket.on('join-group', async ({ name, group, message }) => {
		socket.join(group);
		const joins = join.read();

		const newJoin = new Join(name, group, message);
		const result = joins.length ? [...joins, newJoin] : [newJoin];
		await joins.write({ result });

		io.to(group).emit('message', { result });
	});

	ee.on('photo', data => {
		socket.emit('file', { data });
	});
});

server.listen(4000, () => {
	console.log(4000);
});
