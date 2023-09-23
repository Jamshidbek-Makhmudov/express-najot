const Like = require("../models/Likes.model");
const Post = require("../models/Posts.model");
const User = require("../models/Users.model");

const find = async (req, res) => {
	const likes = await Like.findAll({
		include: [{ model: User }, {model:Post}],
	});
	res.json({likes})

};
 

const create = async (req, res) => {
	const { post_id, user_id } = req.body;
	
	(await Like.create({ post_id, user_id })).save()
	
	res.json({message:"ok"})

 };
module.exports = {find};