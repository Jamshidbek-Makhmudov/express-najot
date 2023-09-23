const express = require('express');
const cors = require('cors');
const config = require('../config');
const sequelize = require('./database');
const routes = require('./routes');
// require('./models/associations');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

const bootstrap = async () => {
	await sequelize.authenticate({
		logging: false,
	});

	await sequelize.sync({
		logging: false,
		alter: true, //db da change bolsa ozi eshitib qilib turadi
		//force:true //eski malumotlarni ochirib yuboradi va yuklashda xato bersa majburlab save qiladi
	});

	app.listen(config.port, () => {
		console.log(`Server listening on port: ${config.port}`);
	});
};

bootstrap();


