const Users = require("../models/User.model");

const currentUser = async (req, res, next) => {
  const {id} = req.verify;

  const user = await Users.findById(id);

  if (!user) return res.status(403).json({message: "Invalid Token"});

  req.user = user;
  next();
};

module.exports = currentUser;
