const express = require("express");
const cors = require("cors");
const config = require("../config");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors()); //cors frontendga dostup bersih uchun
app.use("/api", routes);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});
