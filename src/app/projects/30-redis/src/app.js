const express = require("express");

const app = express();

require("./start/modules")(express, app);
require("./start/run")(app);
/*
Redis:
 1. Object yuklash. Aslida object bomaydi, lekin uni cihga key va balue biriktirsa boladi:
 2. HSET person name jamshid.  // shunaqa davim etib ketaveradi 
 3. HGET person name // shu xolatda oladi
 4. HDEL person age // ochirish

Nodejs da custom erro berib interval server error qaytar deb qoysak va ozimiz shu errorga taqalib qolsak, shu interval errorsan oldin err ni logga chiqarsak bilvolamiz xato qattaligini

29redis darsida auth. Routejsda “/me” bor bu ozini malumotkarini qaytarib okaih uchun bomgan route. Bu user ozini progile avatar rasmini qoyish uchun kerak
*/