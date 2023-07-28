const express = require('express');
const app = express();
const port = 4000;
app.use(express.json());

//get
app.get('/', (req, res) => {
	console.log('hello from backend');
	res.send('Hello World!');
});

//file yuborish
app.get('/html', (req, res) => {
	res.sendFile(__dirname + '/index.html'); //xato bersa file ni pathini qara togrimi?
});
app.get('/text', (req, res) => {
	res.sendFile(__dirname + '/index.txt'); //xato bersa file ni pathini qara togrimi?
});

//post
app.post('/', (req, res) => {
	console.log(req.body);
	res.json(req.body);
});

app.all('/*', (req, res) => {
	res.status(404).json({ message: '404 not found' });
});

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
