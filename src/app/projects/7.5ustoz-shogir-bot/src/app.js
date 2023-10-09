const {Bot, session} = require("grammy");
const config = require("../config");

const commandModule = require("./modules/command");

const registerModule = require("./modules/sherik");
const ishJoyi = require("./modules/IshJoyiKerak");
const hodim = require("./modules/hodim");
const ustoz = require("./modules/ustoz");
const shogird = require("./modules/shogird");

const bot = new Bot(config.token);


bot.use(session({initial: ()=> ({step:"birinchi"})}));

bot.use(commandModule);

bot.use(ishJoyi);
bot.use(ustoz);
bot.use(shogird);
bot.use(hodim);
bot.use(registerModule);

bot.start();