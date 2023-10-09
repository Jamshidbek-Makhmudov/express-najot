const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const CustomError = require("../utils/custom-error");
const { generateToken } = require("../utils/jwt");
const config = require("../../config");


const register = async(req, res, next)=> {
    try{
        const {firts_name, last_name, email, password, phone_number} = req.body;
         

        const {error} = Joi.object({
            firts_name:Joi.string().max(32).required(),
            last_name:Joi.string().max(32).required(),
            email: Joi.string().max(32).required(),
            password: Joi.string().required(),
            phone_number:Joi.string().max(32).required(),
          }).validate({
            firts_name:firts_name?.trim(),
            last_name:last_name?.trim(),
            email: email?.trim(),
            password: password?.trim(),
            phone_number:phone_number?.trim(),
          });
      
        if (error) throw new CustomError(400, error.message);
      
        const findUser = await User.findAll({where:{email:`${email}`}});
        
        if(findUser.length) throw new CustomError(409, "Email already exists"); 
        const hashpassword = await bcrypt.hash(password, 12);
        
        const users = await User.create({firts_name, last_name, email, password, phone_number});
        users.save();

        res.json({message: "OK", users });
    
    }catch(error){
        next(error);
    }
}

const login = async(req, res, next)=> {
    try{
        const {email, password} = req.body;
        
        const findUser = await User.findAll({where:{email:`${email}`, password:password}},);

        if(!findUser.length) {
            
            throw new CustomError(409, "You need register");
        } 
        
        console.log("login",findUser[0].id );
        const token = jwt.sign({ id: findUser[0].id }, config.jwt_key, { expiresIn: "72h" });
        res.json({message: "OK", data: token});

    }catch(error){
        next(error);
    }
}

module.exports = {login, register}