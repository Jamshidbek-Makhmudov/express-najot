const {extname} = require("path");
const {v4} = require("uuid");

const CustomError = require("../utils/custom-error");

const fileUpload = async (req, res, next) => {
  try {
    const file = req.files?.file;

    if (!file) throw new CustomError(400, "File is required");

    const imageName = `${v4()}${extname(file.name)}`;

    file.mv(process.cwd() + "/uploads/" + imageName);

    req.body.file = imageName;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = fileUpload;
