const bcrypt = require("bcrypt");

const User = require("../models/User.model");
const CustomError = require("../utils/custom-error");
const AuthValidator = require("../validations/Auth.validation");
const {sign} = require("../utils/jwt");
const Post = require("../models/Post.Model");

const register = async (req, res, next) => {
  try {
    const {displayName, mail, password, file} = req.body;

    const error = AuthValidator.register({displayName, mail, password});

    if (error) throw new CustomError(403, error.message);

    const user = await User.findOne({where: {mail}});

    if (user) throw new CustomError(403, "User already exists");

    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      mail,
      displayName,
      photo: file,
      password: hashedPass,
    });

    const token = sign({id: newUser.id});

    res.status(201).json({message: "Succes", data: token});
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const {id} = req.user;

    const user = await User.findByPk(id, {include: [{model: Post}]});

    res.json({message: "Success", data: user});
  } catch (error) {
    next(error);
  }
};

module.exports = {register, findOne};
