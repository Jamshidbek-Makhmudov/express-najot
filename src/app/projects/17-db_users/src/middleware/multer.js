const multer = require('multer')
const { resolve} = require('path')


const storage = multer.diskStorage({
	//limit: {fileSize: 1024 * 1024 * 5},
  destination: function (req, file, cb) {
		cb(null, resolve('uploads'));
		

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix+"-" + file.originalname)
	},


})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))cb(null,true);
    else (
      cb(new Error('ivalid file'),false)
    )
   }
});

module.exports = upload;