const Joi = require('joi');

const Io = require('../utils/Io');
const Product = require('../models/Product.model');
const Products = new Io('./database/products.json');

const create = async (req, res) => {
	try {
		const { imageName } = req;
		const { title, description, sell, buy, count } = req.body;
		/**agar productda color modeli bolsa va shuni validate qilayotganda, .valid("red","blue","green") qilib yozib ketiladi. shunda  frontdan faqat shu ranglargina qabul qilinadi
     yana .alphanum() degan validatsiyasi bor. bu faqat harf va raqamni oladi
     .boolean() degani ham bor true false qiymat qabul qiladi
     */

		const schema = Joi.object({
			title: Joi.string().min(3).max(256).required(),
			description: Joi.string().min(64).max(1024).required(),
			sell: Joi.number().min(1).required(),
			buy: Joi.number().min(1).required(),
			count: Joi.number().min(1).required(),
		});

		const { error } = schema.validate({ title, description, sell, buy, count });
		if (error) return res.status(400).json({ message: error.message });

		const products = await Products.read();

		const id = (products[products.length - 1]?.id || 0) + 1;

		const product = new Product(id, imageName, title, description, +sell, +buy, +count);

		const data = products.length ? [...products, product] : [product];

		await Products.write(data);

		res.status(201).json({ message: 'Success', data: product });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

const find = async (req, res) => {
	try {
		const products = await Products.read();

		res.json({ data: products });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

const findOne = async (req, res) => {
	try {
		const { id } = req.params;
		const products = await Products.read();

		const product = products.find(p => p.id === +id);

		res.json({ data: product });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

const edit = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, sell, count, buy } = req.body;

		const schema = Joi.object({
			title: Joi.string().min(3).max(256).required(),
			description: Joi.string().min(64).max(1024).required(),
			sell: Joi.number().min(1).required(),
			buy: Joi.number().min(1).required(),
			count: Joi.number().min(1).required(),
		});

		const { error } = schema.validate({ title, description, sell, buy, count });
		if (error) return res.status(400).json({ message: error.message });

		const products = await Products.read();

		const product = products.find(p => p.id === +id);

		if (!product) return res.status(404).json({ message: 'Product not found' });

		product.title = title;
		product.description = description;
		product.sell = sell;
		product.buy = buy;
		product.count = count;

		await Products.write(products);

		res.json({ message: 'Success', data: product });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

const remove = async (req, res) => {
	const { id } = req.params;
	const products = await Products.read();

	const filter = products.filter(product => product.id != id);

	await Products.write(filter);

	res.json({ message: 'Deleted' });
};

module.exports = {
	create,
	find,
	findOne,
	edit,
	remove,
};
