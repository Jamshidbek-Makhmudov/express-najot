const express = require("express");
const config = require("../config");
const routes = require("./routes");

//compression
const compression =require("compression");


const app = express();

app.use(express.json());

app.use(compression()); //compression


app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

app.listen(config.PORT, ()=>{
    console.log(`Server is ready ${config.PORT}`);
})


/** jsonlarni koplab qoshish:
 const obj={
 name:"Jamshid",
 age:29
 }
 const arr=[];
 arr.length=100;

 arr.fill(obj,0,100);
 res.json(arr);

 */