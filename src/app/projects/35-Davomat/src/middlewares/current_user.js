const Users = require("../models/User.model");
const pupilsModel = require("../models/pupils.model");

const currentUser = async (req, res, next) => {
  const {id} = req.verify;

  const user = await pupilsModel.findById(id);

  if (!user) return res.status(403).json({message: "Invalid Token"});

  req.user = user;
  next();
};

module.exports = currentUser;
