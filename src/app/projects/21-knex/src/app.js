const express = require("express");
const fileUpload = require("express-fileupload");

//rate limiter bu ueser bizni site mizga request yuborishini vaqt bilan belgilab qoysa boladigan package masaln 1 minutda nechta request av hokazoo:
const rateLimiter = require("express-rate-limiter");

const routes = require("./routes");

const app = express();

//rate limiter use:
const limiter = rateLimiter({
  windowMs: 60 * 1000, //15minutes
  max: 5, //count
  standartHeaders: true,//rate limit info
  legacyHeaders: false,//disable the x0rateLimiter-* headers
});

app.use(limiter);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static(process.cwd() + "/uploads"));

app.use("/api", routes);

app.listen(4000, () => {
  console.log(4000);
});
