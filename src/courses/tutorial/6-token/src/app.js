const express = require('express');
const fileUpload = require('express-fileupload');

const config = require('../config');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const authorsRouter = require('./routes/authors.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/uploads'));
app.use(fileUpload());

app.use('/api', authRouter);
app.use('/api', usersRouter);
app.use('/api', authorsRouter);

app.listen(config.port, () => {
	console.log(`10-token server is running on port: ${config.port}`);
});
