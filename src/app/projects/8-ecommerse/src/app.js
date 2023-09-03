/**
 bu mavzuda expressni config muhitini yuklab oldik u config filedagi dotenv ni setting qilib ishlatadigan ishimiz bilan bir xi ish qiladi farqi: dotenvda ozmiz manual setting yozishimiz kerak, express config da esa ozi qulay qilib settinglab qoygan biz.
 uni ishlatish uchun tashqarida config papaka ochiladi development.json yoki default.json file bilan production.json file ochiladi

*/
const express = require('express');
const config = require('config');
const fileUpload = require('express-fileupload');
const cookie = require('cookie-parser'); //cookiega saqlash

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(process.cwd() + '/uploads'));
app.use(cookie()); //cookiega saqlash

app.use('/api', routes);

const port = config.get('port');

app.listen(port, () => {
	console.log(port);
});
