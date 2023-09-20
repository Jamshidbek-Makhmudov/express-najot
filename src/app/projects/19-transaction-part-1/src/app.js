const express = require("express");

const routes = require("./routes");
const config = require("../config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", routes);

app.listen(config.PORT, () => {
  console.log(config.PORT);
});
