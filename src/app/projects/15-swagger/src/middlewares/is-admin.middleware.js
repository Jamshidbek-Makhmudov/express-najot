const Io = require("../utils/Io");
const Users = new Io("./database/users.json");

const isAdmin = async (req, res, next) => {
  const {id} = req.user;

  const users = await Users.read();

  const user = users.find((user) => user.id === id);

  if (!user?.isAdmin)
    return res.status(403).json({message: "Permission Denied"});

  next();
};

module.exports = isAdmin;
