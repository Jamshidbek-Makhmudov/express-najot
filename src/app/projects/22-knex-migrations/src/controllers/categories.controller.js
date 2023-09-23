const Joi = require("joi");
const {knex} = require("../database");

const create = async (req, res) => {
  try {
    const {name} = req.body;

    const schema = Joi.object({
      name: Joi.string().max(32).required(),
    });

    const {error} = schema.validate({name});
    if (error) return res.status(400).json({message: error.message});

    const data = await knex("categories")
      .insert({category_name: name})
      .returning("*");

    res.status(201).json({data});
  } catch (error) {
    console.log(error);
  }
};

const find = async (req, res) => {
  try {
    const data = await knex("categories").select("*");

    res.json({data});
  } catch (error) {
    console.log(error);
  }
};

const findOne = async (req, res) => {
  try {
    const {id} = req.params;

    const data = await knex("categories")
      .select("*")
      .where({category_id: id})
      .first();

    res.json({data});
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;

    const {error} = Joi.object({
      name: Joi.string().required(),
    }).validate({name: name.trim()});

    if (error) return res.status(400).json({message: error.message});

    const data = await knex("categories")
      .update({category_name: name})
      .where({category_id: id})
      .returning("*");

    res.json({data});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  find,
  findOne,
  update,
};
