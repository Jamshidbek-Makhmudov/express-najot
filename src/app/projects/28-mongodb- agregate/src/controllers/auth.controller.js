const bcrypt = require("bcrypt");

const Users = require("../models/User.model");
const {sign} = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const {fullName, username, password} = req.body;

    const findUser = await Users.findOne({username});

    if (findUser)
      return res.status(403).json({message: "Username already exists"});

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = await Users.create({
      fullName,
      username,
      password: hashedPass,
    });

    const token = sign({id: newUser._id});

    res.status(201).json({message: "Success", data: token});
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {
  register,
};
