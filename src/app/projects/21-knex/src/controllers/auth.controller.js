const {knex} = require("../database");
const bcrypt = require("bcrypt");
const {generateJwt} = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const {username, password} = req.body;

    const findUser = await knex("users").select("*").where({username}).first(); //har bir knex oldidan await ishlatsa knexga chain qilib kirib ketib bolmaydi, await qimasadan oxirida 1ta await qilsa knexga chain qilib ketsa boladi
    if (findUser)
      return res.status(403).json({message: "Username already exists"});

    const hashedPass = await bcrypt.hash(password, 12);

    const [user] = await knex("users")
      .insert({username, password: hashedPass})
      .returning("id");

    const token = generateJwt({id: user.id});

    res.status(201).json({message: "Success", data: token});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
};

const login = async (req, res) => {
  try {
    const {username, password} = req.body;

    const findUser = await knex("users").select("*").where({username}).first();
    if (!findUser)
      return res.status(403).json({message: "Invalid username or password"});

    const pass = await bcrypt.compare(password, findUser.password);

    if (!pass)
      return res.status(403).json({message: "Invalid username or password"});

    const token = generateJwt({id: findUser.id});

    res.json({message: "Success", data: token});
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {
  register,
  login,
};
