const express = require('express');
// const config = require("../config")
const fileUpload = require('express-fileupload');

const blog_router = require('../routes/blog.routes');
const user_router = require('../routes/user.router');

const config = require('../config');
//private
//const getRouter = require('../routes/gets');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(process.cwd() + '/uploads'));

app.use('/api', blog_router);
app.use('/api', user_router);
//app.use(getRouter);

app.listen(config.port, () => {
	console.log(config.port);
});
