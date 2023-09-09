const jwt = require("jsonwebtoken");
const Io = require('../utils/Io');
const config = require("../../config");

const admin = new Io(process.cwd()+ "/database/admin.json");

const isAuth = async(req, res, next)=>{
    const token = req.headers.authorization;

    //const admins = await admin.read();

    if(!token) return res.status(401).json({message: "Invalid token"})

    jwt.verify(token, config.jwtsecretkey, (error, data)=>{
        
        if (error) {
            console.log(error.message);
            return  res.status(404).json({message:"You need admin"});
        }
        console.log(data.id);
        next();
        //const find = admins.find((item)=>item.id == data.id);
        
        // if(find){
        // }
        

    })
}
module.exports = isAuth;