const express = require("express");

const config = require("../config");
const routes = require("./routes");

const errorHandler = require("./middlewares/error-handler");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is listening on ${config.port}`);
});
