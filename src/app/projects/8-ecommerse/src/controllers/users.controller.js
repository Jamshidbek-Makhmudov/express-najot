const Io = require("../utils/Io");
const Users = new Io("./database/users.json");

const find = async (req, res) => {
  try {
    const users = await Users.read();

    res.json({users});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {find};
