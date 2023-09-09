const authRouter = require('./auth.route');
const cartRouter = require('./cart.route');
const favouritesRouter = require('./favourites.route');
const orderRouter = require('./order.route');
const productRouter = require('./product.route');
const usersRouter = require('./users.route');

module.exports = [
	authRouter,
	cartRouter,
	favouritesRouter,
	orderRouter,
	productRouter,
	usersRouter,
];
/**buyerda exportni object korinishida bermasligimizni sababi object korinishida bersam appda chaqirganimizda faqat 1-ni oladi. arrayda bersak hammasini ichiga kirib chiqadi. appda "/api" bilan boshlangan hammasini ichida kiradi bu zor
 */
