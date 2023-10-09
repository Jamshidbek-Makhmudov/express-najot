const User = require("../models/User.model");
const { generateToken } = require("../utils/jwt");


const login = async(req, res, next) =>{
    try{    
        const {username, password} = req.body;

        const users = await User.find({username});
     
        if(username==users[0].username && password==users[0].password){
            
            const token = generateToken({id: users[0]._id});
            res.status(201).json({message: "Success", data: token});

        }else res.json({message:"You need User"});



    }catch(error){
        console.log(error.message);
        next(error)
    }
}

module.exports =  {login}