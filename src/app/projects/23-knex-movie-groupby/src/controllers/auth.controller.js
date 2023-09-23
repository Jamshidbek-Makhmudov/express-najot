const Joi = require("joi");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/custom-error");
const {knex} = require("../database");
const {generateToken} = require("../utils/jwt");

const register = async (req, res, next) => {
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
      })
      .returning("*");

    const token = generateToken({id: newUser.id});

    res.status(201).json({message: "Success", data: token});
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const {username, password} = req.body;

    const {error} = Joi.object({
      username: Joi.string().max(32).required(),
      password: Joi.string().required(),
    }).validate({
      username: username?.trim(),
      password: password?.trim(),
    });

    if (error) throw new CustomError(400, error.message);

    const user = await knex("users")
      .select("*")
      .where({username: username.toLowerCase()})
      .first();

    if (!user) throw new CustomError(403, "Invalid Username or password");

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw new CustomError(403, "Invalid Username or password");

    const token = generateToken({id: user.id});

    res.status(201).json({message: "Success", data: token});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
