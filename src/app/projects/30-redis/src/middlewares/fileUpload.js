const {extname} = require("path");
const {v4} = require("uuid");

const fileUpload = async (req, res, next) => {
  const {file} = req.files;

  if (!file) return res.status(400).json({message: "File not found"});

  const name = `${v4()}${extname(file.name)}`;

  file.mv(process.cwd() + "/uploads/" + name);

  req.body.file = name;
  next();
};

module.exports = fileUpload;
