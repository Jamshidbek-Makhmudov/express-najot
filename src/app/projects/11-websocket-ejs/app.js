const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', process.cwd() + 'views');

app.get('/', (req, res) => {
	res.render('index');
});

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

let users = [];

io.on('connection', socket => {
	users.push({ id: socket.id, name: 'user' + users.length });

	const currentUser = users.find(user => user.id === socket.id);

	socket.on('submit', ({ message }) => {
		io.emit('response', { message, user: currentUser.name });
	});

	socket.emit('name', { name: currentUser.name });
	socket.emit('users', { users }); //usersga request kelaganda hamma userlarni berib yuborish

	socket.on('disconnect', data => {
		const name = users.filter(user => user.id !== socket.id);
		users = name;
	});
});

server.listen(3000, () => {
	console.log(3000);
});
