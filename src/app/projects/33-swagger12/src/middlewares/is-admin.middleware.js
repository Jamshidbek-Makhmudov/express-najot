const CustomError = require("../utils/custom-error");

const isAdmin = async (req, res, next) => {
  try {
    const {user} = req;

    if (!user.is_admin) throw new CustomError(403, "Permission denied");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
