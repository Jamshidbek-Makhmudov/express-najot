const jwt = require("jsonwebtoken");
const config = require("../../config");


const isAuth = async(req, res, next)=>{
    const token = req.headers.authorization;
    
    if(!token) return res.status(401).json({message: "Invalid token"})

    jwt.verify(token, config.jwt_key, (error, data)=>{
    
          if (error) {
            console.log(error.message);
            return  res.status(404).json({message:"You need register"});
            
        }
        
        req.id = data.id;

        next();
       

    })
}
module.exports = isAuth;