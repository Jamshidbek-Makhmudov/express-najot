const swaggerJSDoc = require('swagger-jsdoc');
//const express = require('express'); //f
//const router = require('./routes/user.routes'); //f
const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Express API documentation for James project', //Express API for JSONPlaceholder
		version: '1.0.0',
		description:
			'This is a REST API application made with Express. It made for front end documentation',
		servers: ['http://localhost:4000'],
		// license: {
		// 	name: 'Licensed Under MIT', //f
		// 	url: 'https://spdx.org/licenses/MIT.html', //f
		// },
		// contact: {
		// 	name: 'JSONPlaceholder', //f
		// 	url: 'https://jsonplaceholder.typicode.com', //f
		// },
	},
	// servers: [
	// 	{
	// 		url: 'http://localhost:4000',
	// 		description: 'Development server',
	// 	},
	//servers: ['http://localhost:4000'],
};

const options = {
	swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	//apis: ['./routes/*.js'],
	//apis: ['src/swagger/*.swagger.ts'],
	apis: ['src/swagger/*.swagger.js'],
};

// const swaggerJSDoc = require('swagger-jsdoc');
//const swaggerUi = require('swagger-ui-express'); //f

// ...
const swaggerSpec = swaggerJSDoc(options);
module.exports = { swaggerSpec };

// const app = express();

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(router);
// app.listen(3000, () => {
// 	console.log(3000);
// });
