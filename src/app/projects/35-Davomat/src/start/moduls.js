const fileUpload = require("express-fileupload");

const ErrorHandler = require("../middlewares/error-handler");
const routes  = require("../routes")

const moduls = async(express, app) =>{
    app.use(express.json());
    app.use(express.urlencoded({extends:true}));
    app.use(fileUpload());
    
    app.use("/api", routes);
    app.use(ErrorHandler)
}

module.exports = moduls;