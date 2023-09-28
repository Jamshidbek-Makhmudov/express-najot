const { isValidObjectId } = require("mongoose");
const Todos = require("../models/todos");

const create = async (req, res) => {
  try {
    const { title, description, status,author } = req.body;
    const newTodo = new Todos({title, description, status, author});
    await newTodo.save();

    res.status(201).json({message: "Success", newTodo});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};


const find = async (req, res) => {
  try {
  
    const { title } = req.query;
    const filter = {};

    if (title) {
      filter.title = title;
    }

		const data = await Todos.aggregate([
			{ //lookupni populate dan ustunlik tarafi shunday yol bian ishlatib postdan userni userdan postni ovosa boladi, ham tez
				$lookup: {
					from: "users", //kichik harf
					localField: "author",
					foreignField: "_id",
					as:"user", 
				/*
				select * from post inner join users on users._id=posts.author as user
				*/ 

				}
			}
		]);

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};


const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) { 
      return res.status(400).json({ message: "invalid id" })
    }

    const data = await Todos.findById(id).populate("author");

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};


const update = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;

    const data = await Todos.findByIdAndUpdate(id, {
      title,
      description,
    });

    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};


const remove = async (req, res) => {
  try {
    const {id} = req.params;

    await Todos.findByIdAndDelete(id);

    res.json({message: "OK"});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {
  create,
  find,
  findOne,
  update,
  remove,
};
