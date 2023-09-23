const Users = require("../models/users");

const create = async (req, res) => {
	try {
		const { name}=req.body;

		const data = await Users.create({ name });
		data.save();

  res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
const find = async (req, res) => {
	try {
		// const { name } = req.body;
				const data = await Users.find();


    res.json({message: "Success", data});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {
  create,
  find,

};
