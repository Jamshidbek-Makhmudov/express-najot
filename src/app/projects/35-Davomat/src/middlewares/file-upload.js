const {extname} = require("path");
const {v4} = require("uuid");

const fileUpload = async (req, res, next) => {
  try{
    
    const file = req.files?.files;

    if (file){
    
      const name = `${v4()}${extname(file.name)}`;

      file.mv(process.cwd() + "/uploads/" + name);

      req.body.file = name;
    
    }
    next();

  }catch(error){
    console.log(error.message);
  }
};

module.exports = fileUpload;
