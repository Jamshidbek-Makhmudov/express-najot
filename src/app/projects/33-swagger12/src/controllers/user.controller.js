const bcrypt = require("bcrypt");
const Joi = require("joi");

const {knex} = require("../database");
const CustomError = require("../utils/custom-error");

const changeBalance = async (req, res, next) => {
  try {
    const {user} = req;
    const {balance} = req.body;
    const data = await knex("users")
      .update({balance: user.balance + balance})
      .where({id: user.id})
      .returning("*");

    res.json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const data = await knex("users").select("*");

    res.json({message: "Success", data});
  } catch (error) {
    next(error);
  }
};

const getStatistics = async (req, res, next) => {
  try {
    const {fromDate, toDate} = req.query;

    const {rows: data} = await knex.raw(
      `select count(*) as count, date_trunc('MONTH', created_at) as created_at from users where created_at between '${fromDate}' and '${toDate}' group by date_trunc('MONTH', created_at)`
    );

    res.json({message: "Success", data});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const {username, password, fullname} = req.body;

    const {error} = Joi.object({
      username: Joi.string().max(32).required(),
      password: Joi.string().required(),
      fullname: Joi.string().required(),
    }).validate({
      username: username?.trim(),
      password: password?.trim(),
      fullname: fullname?.trim(),
    });

    if (error) throw new CustomError(400, error.message);

    const user = await knex("users")
      .select("*")
      .where({username: username.toLowerCase()})
      .first();

    if (user) throw new CustomError(409, "Username already exists");

    const hashedPass = await bcrypt.hash(password, 12);

    const [newUser] = await knex("users")
      .insert({
        username: username.toLowerCase(),
        password: hashedPass,
        fullname,
        is_admin: true,
      })
      .returning("*");

    res.status(201).json({message: "Success", data: newUser});
  } catch (error) {
    next(error);
  }
};

module.exports = {changeBalance, find, create, getStatistics};
