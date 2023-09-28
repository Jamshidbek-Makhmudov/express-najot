const express = require("express");
const sendMail = require("./utils/send-mail");
const app = express();

// sendMail({to:"jamesrootcore@gmail.com",subject:"Hello",html:"code: 123"});


require("./start/modules")(app, express);
require("./start/run")(app);

/*
Redis:
1.google qanday ornatish yozilgan

2. nima u?: cashe database

3. nega kerak?: odatda sms verificationlar shunday cashe(vaqtinchalik databaselarda saqlanadi), ularga vaqt berib qoyiladi agar shu vaqtdan otib ketgandan song ham togri kod kelsa qabul qilmaydi. agar vaqt berilmasa foreever saqlab qoyadi bu malumotni

4. malumotlar qadnay saqlanadi?: key va value sifatida sqlanadi va faqat string holatda saqlanadi. biz objectlarni saqlamoqchi bolsa json.stringify qilib yuboramiz: 
set key value  //qilib save qilamiz.
get key       //qilib chaqirib olamiz
del key       //qilib ochiramiz.
set key "value" EX time    // vaqt bilan limit beramiz

5.TTL nima?: TIME TO LIVE  bu degani exprires in bersa biladi

*/