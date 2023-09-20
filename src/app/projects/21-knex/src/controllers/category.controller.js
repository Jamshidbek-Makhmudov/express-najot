const {extname} = require("path");
const {unlink} = require("fs").promises;
const {knex} = require("../database");
const {v4} = require("uuid");

const find = async (req, res) => {
  try {
    const categories = await knex.select("*").from("categories");

    res.json({message: "OK", data: categories});
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};
const findOne = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      rows: [category],
    } = await knex.raw(`select * from categories where id = :id`, {id});

    res.json({message: "OK", data: category});
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};
const create = async (req, res) => {
  try {
    const {name} = req.body;
    const {photo} = req.files;

    const imageName = `${v4()}${extname(photo.name)}`;

    photo.mv(`${process.cwd()}/uploads/${imageName}`);

    const [newData] = await knex("categories")
      .insert({name, photo: imageName})
      .returning("*");

    res.status(201).json({message: "Success", data: newData});
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};
const update = async (req, res) => {
  try {
    const {name} = req.body;
    const {photo} = req.files;
    const {id} = req.params;

    const imageName = `${v4()}${extname(photo.name)}`;

    photo.mv(`${process.cwd()}/uploads/${imageName}`);
    const oldData = await knex("categories").select("*").where({id}).first();

    await unlink(`${process.cwd()}/uploads/${oldData.photo}`);

    const [data] = await knex("categories")
      .update({name, photo: imageName})
      .where({id})
      .returning("*");

    res.json({message: "Success", data});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {
  find,
  findOne,
  create,
  update,
};
