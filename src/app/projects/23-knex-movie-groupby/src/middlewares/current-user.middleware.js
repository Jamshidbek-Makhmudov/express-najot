const {knex} = require("../database");

const currentUser = async (req, res, next) => {
  try {
    const {
      verify: {id},
    } = req;

    const user = await knex("users").select("*").where({id}).first();

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = currentUser;
