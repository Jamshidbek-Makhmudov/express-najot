const {verify} = require("../utils/jwt");
const Users = require("../models/User.model");

const isAdmin = async (req, res, next) => {
  try {
    const {id} = req.verify;
    const user = await Users.findById(id);
    if (!user.isAdmin)
      return res.status(403).json({message: "Permission Denied"});

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAdmin;
