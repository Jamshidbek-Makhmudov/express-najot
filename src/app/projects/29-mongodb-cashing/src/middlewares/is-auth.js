const CustomError = require("../utils/custom-error");
const {verifyToken} = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] ?? req.headers.authorization;

    if (!token) throw new CustomError(401, "Invalid Token");

    verifyToken(token, (err, data) => {
      if (err) throw new CustomError(401, "Invalid Token");

      req.verify = data;
      next();
    });
  } catch (error) {
    next(error);//buni next qilgani controllerga borib tushadi, shunda controllerda 1- argument erro bopqoladi
  }
};

module.exports = isAuth;
