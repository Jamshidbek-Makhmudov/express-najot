const Joi = require("joi");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");
const CustomError = require("../utils/custom-error");
const { generateToken } = require("../utils/jwt");
const config = require("../../config");


const register = async(req, res, next)=> {
    try{
        const {email, password} = req.body;
        
        const {error} = Joi.object({
            email: Joi.string().max(32).required(),
            password: Joi.string().required(),
          }).validate({
            email: email?.trim(),
            password: password?.trim(),
          });
      
        if (error) throw new CustomError(400, error.message);
      
        const findUser = await Admin.findAll({where:{email:`${email}`}});
        
        if(findUser.length) throw new CustomError(409, "Email already exists"); 
        
        const users = await Admin.create({email, password});
        users.save();

        res.json({message: "OK", users });
    
    }catch(error){
        next(error);
    }
}


const login = async(req, res, next)=> {
    try{
        const {email, password} = req.body;
        
        const findUser = await Admin.findAll({where:{email:`${email}`, password:password}});

        if(!findUser.length) {
            
            throw new CustomError(409, "You are not Admin");
        } 
        const token = jwt.sign({ id: findUser[0].id }, config.jwt_key, { expiresIn: "72h" });
            
        res.json({message: "OK", data: token});

    }catch(error){
        next(error);
    }
}

module.exports = {login, register};