const {Op} = require("sequelize");
const Post = require("../models/Post.Model");
const User = require("../models/User.model");
const CustomError = require("../utils/custom-error");
const PostValidator = require("../validations/Post.validation");
const sequelize = require("../utils/sequelize");
const sendMail = require("../utils/send-mail");

const create = async (req, res, next) => {
  try {
    const {title, description, file} = req.body;
    const {id} = req.user;

    const error = PostValidator.create({title, description});
    if (error) throw new CustomError(400, error.message);

    await Post.create({title, description, photo: file, user_id: id});

    const html = `<div style="width: 400px; height: 300px; border: 3px solid black">
    <img src="/${file}" alt="" />
    <b>${title}</b>
    <div>${description}</div>
  </div>`;
    console.log(html);

    const user = await User.findByPk(id);
    await sendMail(user.mail, html);

    res.status(201).json({message: "Successfully Created"});
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const {search, descr, from, to} = req.query;

    let filter = {};

    if (search) {
      filter = {
        ...filter,
        title: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }

    if (descr) {
      filter = {
        ...filter,
        description: {
          [Op.like]: `${descr}%`,
        },
      };
    }

    if (from && to) {
      filter = {
        ...filter,
        created_at: {
          [Op.between]: [from, to],
        },
      };
    }

    const posts = await Post.findAll({
      where: filter,
      group: ["month"],
      attributes: [
        [
          sequelize.fn("date_trunc", "month", sequelize.col("created_at")),
          "month",
        ],
        /**
         sequelize.fn - bu function yasab beradi. "date_trunc" - degan function ysab berdi. bu function sql function bolib oz ichiga 2ta qiymat oladi 
         "month", sequelize.col("created_at")), - bu shu function ichiga oladigan argumentlar oxiridagi "month" esa gruppani qanday no bilan nomlashim kerakligi
         */
        [sequelize.fn("count", "*"), "count"],
      ],
    });

    res.json({posts});
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const {id} = req.params;

    const post = await Post.findByPk(id, {include: [{model: User}]});

    res.json({message: "Success", data: post});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  find,
  findOne,
};
