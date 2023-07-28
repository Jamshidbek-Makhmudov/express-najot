//expressga kirish 1- dars server kotarish va req methodlari
const express = require('express');
const app = express();
const port = 4000;
app.use(express.json()); //req dan keladigan datani ozi json.parsa qilib oladi

app.get('/', (req, res) => {
	console.log('hello from backend');

	res.send('Hello World!'); //expressda text javob yuborish
});

app.post('/', (req, res) => {
	console.log(req.body);
	//res.send('POST request to the homepage');
	//res.end()  //hech narsa yubormoqchi bolmasa, sorovni kutb turmasdan shunchaki yopib qoya qoladi
	res.json(req.body); //kelgan data qayta yubormoqchi bolsa sjon.stringify qilib ozi jonatadi
});

//giving back error
app.get('/*', (req, res) => {
	res.send('404 not found');
});
app.post('/*', (req, res) => {
	res.send('404 not found');
});
app.put('/*', (req, res) => {
	res.send('404 not found');
});
app.get('/hel*lo', (req, res) => {
	//helasdadasdasdlo boshi va oxiri togri kelsa 404 chiqaradi
	res.send('404 not found');
});

//yoki using all method
//all method
app.all('/*', (req, res) => {
	//res.statusCode(404) //yoki res.status()
	res.status(404).json({ message: '404 not found' }); //json ni stringify qilish shartmas
});

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
