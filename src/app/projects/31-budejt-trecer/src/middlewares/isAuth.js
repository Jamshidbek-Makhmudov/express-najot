const jwt = require("jsonwebtoken");
const config = require("../../config");


const isAuth = async(req, res, next)=>{
    const token = req.headers.authorization;

    if(!token) return res.status(401).json({message: "Invalid token"})

    jwt.verify(token, config.JSW_KEY, (error, data)=>{
    
          if (error) {
            console.log(error.message);
            return  res.status(404).json({message:"You need register"});
            
        }
        
        req.r_id = data.id;
        next();
       

    })
}
module.exports = isAuth;