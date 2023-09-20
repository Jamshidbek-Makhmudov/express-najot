// ERROR FIRST

const CustomError = require("../utils/custom-error");
//nodejsda error birinchi keladi callbackda 
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({message: err.message});
  }

  res.status(500).json({message: "Internal Server error"});
};

module.exports = errorHandler;
