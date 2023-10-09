const jwt = require("jsonwebtoken");
const Joi = require("joi");
const {knex} = require("../../database");
//const config = require("../../config");
const config = require("../../config")

const create = async(req, res, next) => {
    try{
        const{firstname, email, balance} = req.body;

        const {error} = Joi.object({
            firstname:Joi.string().max(10).required(),
            email: Joi.string().max(16).required(),
            balance :Joi.number(),
        }).validate({firstname, email, balance});

        if(error) return res.status(400).json({message: error.message});
        
        const findUser = await knex("users").select("*").where({email}).first();
    

        if(findUser)
            return res.status(403).json({message: "Email already exsits"})

        const [user] = await knex("users").insert({firstname, email, balance}).returning("id");


        const token = jwt.sign({id:user.id}, config.JSW_KEY, {expiresIn:"72h"})

        res.status(201).json({message:"Success", data: token})
    
    }catch(error){
        next(error)
    }
}

const update = async(req, res, next) => {
    try{
        const {firstname, email} = req.body;
        const {id} = req.params;
        const [data] = await knex("users").update({firstname, email}).where({id}).returning("*");
 
  

      res.json({message: "Success", data});
    }catch(error){
        next(error);
    }
};

const remove = async(req, res,next) => {
    try{
        const {id} = req.params;
        console.log(id);

        await knex("users").del().where({id});
        res.json({message: "Success"});

    }catch(error){
        next(error);
    }
};


const find = async(req, res, next) => {
    try{
        const {id} = req.params;
        
        const {rows:[users]} = await knex.raw(`select * from users where id = :id`, {id});
        res.json({message:"Ok", data: users})
    
    }catch(error){
        next(error);
    }
}

const findAll = async(req, res, next) => {
    try{    
        
        const users = await knex.select("*").from("users");
        res.json({message: "OK", data: users});

    }catch(error){
        next(error)
    }
}







module.exports = {create, update, remove, find, findAll}; 
