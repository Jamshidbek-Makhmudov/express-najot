const Joi = require("joi");
const CustomError = require("../utils/custom-error");
const {knex} = require("../database");

const create = async (req, res, next) => {
  try {
    const {name, description, year, price, file, video_url, release} = req.body;

    const {error} = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      year: Joi.number().required(),
      price: Joi.number().required(),
      file: Joi.string().required(),
      video_url: Joi.string().uri().required(),
      release: Joi.date().required(),
    }).validate({name, description, year, price, file, video_url, release});

    if (error) throw new CustomError(400, error.message);

    const [data] = await knex("films")
      .insert({
        name,
        description,
        year,
        price,
        video_url,
        release,
        photo: file,
      })
      .returning("*");

    res.status(201).json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const {id} = req.params;

    const data = await knex("films").select("*").where({id}).first();

    if (data?.release > new Date()) {
      delete data?.video_url;
    }

    res.json({message: "Success", data});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const {year, search, fromPrice, toPrice, release} = req.query;

    let query = knex("films").select("*");

    if (year) {
      query = query.where({year});
    }

    if (search) {
      query = query.whereILike("name", `%${search}%`);
    }

    if (fromPrice) {
      query = query.where("price", ">=", fromPrice);
    }

    if (toPrice) {
      query = query.where("price", "<=", toPrice);
    }

    if (release === "true") {
      query = query.where("release", ">=", new Date());
    }

    const data = await query;
    res.json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  findOne,
  find,
};
