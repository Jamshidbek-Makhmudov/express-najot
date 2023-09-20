const todosQuery = require("../queries/todos.query");
const CustomError = require("../utils/custom-error");
const {fetch, fetchOne} = require("../utils/pg");
const TodoValidator = require("../validations/todos.validation");

const create = async (req, res, next) => {
  try {
    const {title, description} = req.body;

    const result = await TodoValidator.create({title, description});
    if (result.error) throw new CustomError(result.error.message, 400);

    const data = await todosQuery.create(title, description);

    res.status(201).json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const todos = await todosQuery.find();

    res.json({message: "Success", data: todos});
  } catch (error) {
    next(error);
  }
};
const search = async (req, res, next) => {
  try {
    const { search } = req.query;
    //shunda queryda: /api/search/todos/?search=name    qilib qidirish kerak

    const todos = await fetch("select * from todos where title like $1 order by created_at",`%${search}%`);

    res.json({ message: "Success", data: todos });
    console.log({todos});
    
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const todo = await fetchOne("select * from todos where id = $1", id);

    res.json({message: "Success", data: todo});
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;

    const data = await fetchOne(
      "update todos set title = $1, description = $2 where id = $3 returning*",
      title,
      description,
      id
    );

    res.json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {status} = req.body;

    const isCompleted = status ? "success" : "reject";

    const data = await fetchOne(
      "update todos set status = $1 where id = $2 returning*",
      isCompleted,
      id
    );

    res.json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const {id} = req.params;

    const data = await fetchOne(
      "delete from todos where id = $1 returning*",
      id
    );

    res.status(200).json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  find,
  search,
  findOne,
  update,
  changeStatus,
  remove,
};
