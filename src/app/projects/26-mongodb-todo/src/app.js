const express = require("express");
const {connect} = require("mongoose");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

const bootstrap = async () => {
  await connect("mongodb://127.0.0.1:27017/taskmanager");

  app.listen(4000, () => {
    console.log(4000);
  });
};

bootstrap();

//mongodbda malumotlar josn bson xolatda saqlanadi .//bson lar bu binary data degani




/**mongodb bu database
 * mongoose bu ODM
 cluster: James
 usrname: james
 username password: BvXTRC8EBzuzeRTZ

 model esa table name teng
 mongodb da collection - tablega teng
 sqlda pg query yasab beradi;
 knex kodlarimizni pgga ogirib beradi
 sequlize knexni ustiga qurilgan orm

 mongdb orm uchun mongoose ishlatilinadi

 id ni ozi _id qilib object id dan generate qilib beradi id ni ichida ozini created date lari bilan bolaadi agar shu id si orqali created at ni ovomoqchi bolsa data._id.gettimestamp() deb olaman
 createdAt va updatedAt ni ham ozi generate qilib beradi

 queries:
 1. show databases
 2. use databse name
 3. show collections
 4.db.databasename.find()
 4.db.databasename.find().pretty
 4.db.databasename.find({rowname:"user_name"}).

*/