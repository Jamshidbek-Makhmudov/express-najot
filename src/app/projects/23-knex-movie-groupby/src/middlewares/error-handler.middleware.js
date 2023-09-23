const CustomError = require("../utils/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({message: err.message});
  }

  res.status(500).json({message: "Internal Server Error"});
};

module.exports = errorHandler;
