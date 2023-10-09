const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const sequelize = require("./database");
require("./models/associations");

const config = require("../config");
const routes = require("./routes")

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
app.use(express.static(process.cwd() + "/uploads"));

app.use("/api", routes)

const bootstrap = async () => {
    await sequelize.authenticate({
      logging: false,

      
    });
  
    
    await sequelize.sync({
      logging: false,
      alter: true,
  
    });
  
    app.listen(config.port, () => {
      console.log(`Server listening on port: ${config.port}`);
    });
  };
  
  bootstrap();
  

