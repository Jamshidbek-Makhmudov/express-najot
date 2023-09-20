const {v4} = require("uuid");
const {extname} = require("path");

const {knex} = require("../database");

const find = async (req, res) => {
  try {
    const products = await knex("products")
      .select(
        "price",
        "amount",
        knex.ref("id").withSchema("products"),
        knex.ref("name").withSchema("products"),
        knex.ref("photo").withSchema("products"),
        knex.ref("name as category").withSchema("categories")
      )
      .innerJoin("categories", "products.category_id", "categories.id");

    res.json({message: "OK", data: products});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const findOne = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await knex("products")
      .select(
        "price",
        "amount",
        knex.ref("id").withSchema("products"),
        knex.ref("name").withSchema("products"),
        knex.ref("photo").withSchema("products"),
        knex.ref("name as category").withSchema("categories")
      )
      .innerJoin("categories", "products.category_id", "categories.id")
      .where({"products.id": id})
      .first();

    res.json({message: "OK", data: product});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const create = async (req, res) => {
  try {
    const {name, price, amount, category_id} = req.body;
    const {photo} = req.files;

    const imageName = `${v4()}${extname(photo.name)}`;

    photo.mv(`${process.cwd()}/uploads/${imageName}`);

    const [data] = await knex("products")
      .insert({
        name,
        photo: imageName,
        price,
        amount,
        category_id
      })
      .returning("*");

    res.status(201).json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const update = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const remove = async (req, res) => {
  try {
    const {id} = req.params;
    await knex("products").del().where({id});

    res.json({message: "Success"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  find,
  findOne,
  create,
  update,
  remove,
};
