const Post = require("../models/Posts.model");
const User = require("../models/Users.model");

const find = async (req, res) => {

  //bu ichma icha bir nechta table larni join qilish junkyard can't she can temporarily
  // const posts = await Post.findAll({
  //   include: [
  //     {
  //       model: User,
  //       include: [
  //         {
  //           model:Like
  //         }
  //       ]
  //     }
  //   ]
  // });

  //bu 1taga join qilish usuli
  const posts = await Post.findAll({
    include: User,
    attributes: {
      exclude: ["title"], //bu shu rowni tashlab olib kelmaydi va bu userga bazi malumotlarni korsatmaslik uchun kerak
    },
  });

  res.json({posts});
};

const create = async (req, res) => {
  const {photo, title, user_id} = req.body;

  (await Post.create({photo, title, user_id})).save();

  res.json({message: "OK"});
};

module.exports = {
  find,
  create,
};
