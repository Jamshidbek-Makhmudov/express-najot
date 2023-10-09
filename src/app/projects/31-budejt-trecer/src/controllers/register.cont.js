const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const {knex} = require("../../database");
const config = require("../../config")
const {generateToken} = require("../utils/jwt")

const CustomError = require("../utils/custom-error");

const register = async(req, res, next)=>{
    try{
        const {firstname, lastname, email, password, balance} = req.body;
        
        
        const {error} = Joi.object({
            firstname:Joi.string().max(64).required(),
            lastname: Joi.string().max(64).required(),
            email: Joi.string().max(64).required(),
            password :Joi.string().required(),
            balance: Joi.required(),
        }).validate({
            firstname: firstname?.trim(),
            lastname:lastname?.trim(), 
            email:email?.trim(), 
            password:password?.trim(),
            balance,
        });

        if(error) return res.status(400).json({message: error.message});

        const findUser = await knex("register").select("*").where({email}).first();
        

        if(findUser)
            return res.status(403).json({message: "Email already exsits"})


        const hashpassword = await bcrypt.hash(password, 12);

        const [user] = await knex("register").insert({firstname,lastname, email, password: hashpassword, balance}).returning("*");

        const token = jwt.sign({id:user.r_id}, config.JSW_KEY, {expiresIn:"72h"})

        res.status(201).json({message:"Success", data: token})
        
    }catch(error){
        next(error)
    }
}

const login = async(req, res, next)=>{
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

    const user = await knex("register")
      .select("*")
      .where({email})
      .first();

    if (!user) throw new CustomError( "Invalid Username or password",403,);

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw new CustomError(403, "Invalid Username or password");

    const token = jwt.sign({id:user.r_id}, config.JSW_KEY, {expiresIn:"72h"})
   
    res.status(201).json({message: "Success", data: token});
    }catch(error){
        next(error)
    }
}




module.exports = {register,login}