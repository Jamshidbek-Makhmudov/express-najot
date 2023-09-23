const Like = require("../models/Likes.model");
const Post = require("../models/Posts.model");
const User = require("../models/Users.model");

const find = async (req, res) => {
  const users = await User.findAll({
    include: [
      { model: Post },
      {
        model: Like,
        include:Post, //ichma ich bemalol ketsa boladi
        attribute: {
          exclude:["created_at","updated_at"],

        },
      },
  ]});

  res.json({users});
};

const create = async (req, res) => {
  const {username, fullName} = req.body;

  (await User.create({username, fullName})).save();

  res.json({message: "OK"});
};

module.exports = {
  find,
  create,
};
