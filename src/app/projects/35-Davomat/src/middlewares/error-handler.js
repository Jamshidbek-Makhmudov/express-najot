const CustomError = require("../utils/custom-error");

const errorHandler = (err, _, res, __) => {
    if(err instanceof CustomError) {
        return res.status(err.status).json({message: err.message});
    }

    res.status(500).json({message:"Internal server Error"});
};

module.exports = errorHandler;