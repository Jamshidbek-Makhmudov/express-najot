const Joi = require("joi");
const jwt = require("jsonwebtoken")
const config = require("../../config/index");
const query = require("../query/register");

const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
    
        const {error} = Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        }).validate({name, email, password});
    
        
        if (error) {
            res.json({message: error.message})
            return res.status(400).json({message: error.message});
        }
        const data = await query.insert(name, email, password);
        console.log(data);

        const token = jwt.sign({id:data.id}, config.JsonWebToken_key, {expiresIn:"72h"})
        res.json({message:"successfully", token });
    }catch(error){
        console.log(error.message);
    }
    
}

const login = async(req,res)=>{
    try{
        const {name, password} = req.body;
        const data = await query.login(name, password);
        
        if (data){
            res.status(200).json({message:"Add your service or choose"});
        } else {
            res.status(402).json({message:"You need register"});
        }

    }catch(error){
        console.log(error.message);
    }
}

module.exports = {register, login}
