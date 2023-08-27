const path = require('path');
const { v4: uuid } = require('uuid');

const jwt = require('jsonwebtoken');
const config = require('../config');

const Io = require('../utils/Io');
const tokens = new Io(process.cwd() + '/database/tokens.json');
const blogs = new Io(process.cwd() + '/database/blogs.json');
const users = new Io(process.cwd() + '/database/users.json');

const Blog = require('../modules/Blog.class');
const Token_class = require('../modules/token.class');

const create = async (req, res) => {
	try {
		const { title, owner, description } = req.body;
		const image = req.files?.photo;

		const blogs_json = await blogs.read();

		if (!blogs_json || !image) return res.status(403).json({ message: 'Error' });

		const id = (blogs_json[blogs_json.length - 1]?.id || 0) + 1;

		if (image) {
			const mimtype = path.extname(image.name);
			photo = uuid() + mimtype;
			image.mv(path.join(process.cwd(), 'uploads', photo));
		}

		const newBlog = new Blog(id, title, photo, owner, description);

		const data = blogs_json.length ? [...blogs_json, newBlog] : [newBlog];

		await blogs.write(data);

		const token = jwt.sign({ id: id }, config.jwtSecretKey, { expiresIn: '72h' });
		res.json({ messages: 'Successfully', token });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERRORA' });
	}
};

const getById = async (req, res) => {
	try {
		const { id } = req.params;

		const blog_read = await blogs.read();
		const readToken = await tokens.read();
		const user_blog = await users.read();

		const find = blog_read.find(item => item.id == id);
		const findID = readToken.find(item => item.id == req.userID && item.blog == id);

		if (findID == undefined) {
			find.view += 1;
			await blogs.write(blog_read);

			const newtoken = new Token_class(req.userID, id);

			const result = readToken.length ? [...readToken, newtoken] : [newtoken];
			await tokens.write(result);
		}

		const findBlog = Array(find).map(item => {
			item.owner = user_blog.filter(u => u.id == item.id);
			return item;
		});

		res.json({ message: 'Successfully', findBlog });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

const getAll = async (req, res) => {
	try {
		const blog_read = await blogs.read();
		const user_blog = await users.read();

		const find = blog_read.map(item => {
			item.owner = user_blog.filter(u => u.id == item.id);
			return item;
		});

		res.json({ blog: find });
	} catch (error) {
		res.status(500).json({ message: 'INVALID SERVER ERROR' });
	}
};

module.exports = { create, getById, getAll };
