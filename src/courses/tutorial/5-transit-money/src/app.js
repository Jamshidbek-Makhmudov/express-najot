const express = require('express');
const config = require('../config');
const app = express();
const userRouter = require('./routes/users');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(userRouter); //shu yerda ketma ketlik myhim

app.listen(config.port, () => {
	console.log(config.port);
});
