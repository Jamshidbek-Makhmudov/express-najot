const {knex} = require("../database");
const User = require("../models/user");

const currentUser = async (req, res, next) => {
  try {

    const id  = req.id
    const user = await User.findAll({where:{id}})

    req.user = user;
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = currentUser;
