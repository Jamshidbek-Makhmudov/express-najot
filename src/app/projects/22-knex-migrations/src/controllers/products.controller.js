const Joi = require("joi");

const {knex} = require("../database");

const create = async (req, res) => {
  try {
    const {name, description, price, category} = req.body;

    const {error} = Joi.object({
      name: Joi.string().max(32).required(),
      description: Joi.string().max(1024).required(),
      price: Joi.number().required(),
      category: Joi.string().uuid().required(),
    }).validate({
      name: name.trim(),
      category,
      description: description.trim(),
      price,
    });

    if (error) return res.status(400).json({ message: error.message });

    //insert into database

    // const [data] = await knex("products").insert({
    //   product_name: name,
    //   product_description: description,
    //   product_price: price,
    //   category
    // }).returning("*");
    // res.status(201).json({data:data});

    


    //tarnsaction
    const trx = await knex.transaction();

    try {
      const [data] = await trx("products")
        .insert({
          product_name: name,
          product_description: description,
          product_price: price,
          category,
        })
        .returning("*");

      const [data1] = await trx("products")
        .insert({
          product_name: name,
          product_description: description,
          product_price: price,
          category,
        })
        .returning("*");

      await trx.commit();
      res.status(201).json({data, data1});
    } catch (error) {
      await trx.rollback();
      res.status(500).json({message: "Internal SErver"});
    }
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const {id} = req.params;
  } catch (error) {
    console.log(error);
  }
};

const find = async (req, res) => {
  try {
    const {category, fromPrice, toPrice, priceSort, rating, date} = req.query;

    let query = knex("products");

    if (category) {
      query = query.where({category});
    }

    if (fromPrice) {
      query = query.where("product_price", ">", fromPrice);
    }

    if (toPrice) {
      query = query.where("product_price", "<", toPrice);
    }

    if (date) {
      query = query.orderBy("product_created_at", date);
    }

    if (priceSort) {
      query = query.orderBy("product_price", priceSort);
    }

    const data = await query;
    res.json({data});
  } catch (error) {
    console.log(error);
  }
};

const findOne = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await knex("products")
      .select("*")
      .where({product_id: id})
      .first();

    res.json({data});
  } catch (error) {
    console.log(error);
  }
};

const remove = async (req, res) => {
  try {
    const {id} = req.params;

    const data = await knex("products").del().where({product_id: id});
    // .returning("*");

    res.json({data});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  update,
  find,
  findOne,
  remove,
};
