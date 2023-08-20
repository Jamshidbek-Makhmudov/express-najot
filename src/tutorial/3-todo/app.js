//nodejs da front da backendga request tashlay olishi uchun setheader bilan ruxsat berar edik
//lekin bu express qilmaymiz expressda npm i cors qilib npm packed yuklab olamiz va shu orqali ruxsat beramiz;

const express = require('express');
const cors = require('cors');
const Io = require('./utils/io');
const Todo = require('./models/Todo');

const Todos = new Io('./database/todos.json');

const app = express();
const port = 4000;
app.use(express.json()); //auto json ni parsa va stringify qilib beradi
app.use(express.urlencoded({ extended: true })); //buni yozganimizni sababi front dan xozir from input ichidan turib togridan togri backendga post requestini yuboramiz shunda form json holatda kelmaydi aksincha urlencoded farmatda keladi expressni urlencoded metjhodi form inputdan kelgan datalrni parsalr beradi
app.use(cors()); //cors function qaytadi // ozi default xolatida * ga yani barchaga ruxsat beradi
//   app.use(cors({ origin: '127.0.0.1:5500/index.html' })); //1ta urlga dostup berish, lekin agar 1 nechta urlga dostup berish kerak bolsa  app.use(cors({origin:[url1],[url2],[url3]})) qilib ketsa boladi
//get  frist step
app.get('/', (req, res) => {
	console.log('hello from backend');
	res.send('Hello World!');
});

//post  creating
app.post('/todo', async (req, res) => {
	console.log(req.body);

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

// get  reading
app.get('/todos', async (req, res) => {
	const todos = await Todos.read();
	res.json({ todos });
});

//get find one
app.get('/todo/:id', async (req, res) => {
	const { id } = req.params;

	const todos = await Todos.read();

	const findTodo = todos.find(todo => todo.id == id);

	res.json({ todo: findTodo });
});

//put means editing or updating

app.put('/todo/:id', async (req, res) => {
	const { id } = req.params; //put bilan param ishlatamiz bu body dan kelmaydi

	const { title, description } = req.body;

	const todos = await Todos.read();

	const findTodo = todos.find(todo => todo.id == id);

	if (!findTodo) {
		return res.status(404).json({ message: 'Todo not found!' });
	}

	findTodo.title = title ? title : findTodo.title;
	findTodo.description = description ? description : findTodo.description;

	await Todos.write(todos); //reference ishlaydi ortada ozgartirgan narseng qoshib ketgan boladi

	res.json({ message: 'successfuly updated' });
});

//delete

app.delete('/todo/:id', async (req, res) => {
	const { id } = req.params;

	const { title, description } = req.body;

	const todos = await Todos.read();
	const findTodo = todos.find(todo => todo.id == id);

	if (!findTodo) {
		return res.status(404).json({ message: 'Todo not found!' });
	}

	const filterTodo = todos.filter(todo => todo.id != id);

	await Todos.write(filterTodo);

	res.json({ message: 'deleted succesfuly' });
});

app.all('/*', (req, res) => {
	res.status(404).json({ message: '404 not found' });
});

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
