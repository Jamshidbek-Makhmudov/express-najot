const CustomError = require("../utils/custom-error");

const errorHandler = (err, _, res, __) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({message: err.message});
  }//erorlarni aniqlab ozi chiqarib beradi agar chiqarmasa pasdagi kodni yuboramiz

  res.status(500).json({message: "Internal Server Error"});
};

module.exports = errorHandler;
