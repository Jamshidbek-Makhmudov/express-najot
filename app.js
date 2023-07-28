const express = require('express');
const Io = require('./utils/io');
const Todo = require('./models/Todo');

const Todos = new Io('./database/todos.json');

const app = express();
const port = 4000;
app.use(express.json());

//get
app.get('/', (req, res) => {
	console.log('hello from backend');
	res.send('Hello World!');
});

//post
app.post('/todo', async (req, res) => {
	const { title, description } = req.body;

	if (!title || !description) {
		return res.status(400).json({ message: `${title} and ${description} is required` }); //400 status code backendga kerakli togri malumot yuborilmaganda qaytaradi

		//1ta request methodini ichida doim 1ta response boladi, agar koproq res jonatmoqchi bolinsa
		// ular if, else biln tekshirilishi kerak, va 1- ifdan keyin return yuborilishi zarur.
		// aks xolat kod ishlaydi lekin responselar kesishgan nodejs - san 1ta requestdga 2ta res bermoqchisan deb error qaytardi.shuning uchun har 1ta validatsiyada return yozish esdan  chiqmasin if ni ichidagi return shu sababdan yozildi
	}

	const todos = await Todos.read();

	const id = (todos[todos.length - 1]?.id || 0) + 1;

	const newTodo = new Todo(id, title, description);

	const data = todos.length ? [...todos, newTodo] : [newTodo];

	await Todos.write(data);

	res.status(201).json({ message: 'Todo created successfuly' });
});

app.all('/*', (req, res) => {
	res.status(404).json({ message: '404 not found' });
});

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
