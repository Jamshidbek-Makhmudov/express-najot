const express = require("express");
const fileUpload = require("express-fileupload");

const config = require("../config");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static(process.cwd() + "/uploads"));

app.use("/api", routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
