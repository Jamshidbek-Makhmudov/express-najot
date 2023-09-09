/**

 now user managment system
*/
const express = require('express');
//const config = require('config');
const config = require(process.cwd() + '/config');
const fileUpload = require('express-fileupload');
const cookie = require('cookie-parser'); //cookiega saqlash

const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const { swaggerSpec } = require('./swagger/options');
const expressBasicAuth = require('express-basic-auth');

const app = express();

//use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(process.cwd() + '/uploads'));
app.use(cookie()); //cookiega saqlash
app.use('/api', routes);

//this for secure our swagger ui
app.use(
	['/docs'],
	expressBasicAuth({
		challenge: true,
		users: {
			us: 'james123',
		},
	})
);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//listen

// const port = config.get('port');

app.listen(+config.port, () => {
	console.log(`server is running on port ${+config.port}`);
	// console.log(+config.port);
});
