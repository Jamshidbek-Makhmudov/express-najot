const Joi = require("joi");
const Admin = require("../models/admin");
const Author = require("../models/author");
const User = require("../models/author");
const CustomError = require("../utils/custom-error");


const create = async(req, res, next)=> {
    try {
        
        const {firts_name, last_name, birth_date, death_date, country, bio} = req.body;
        const photo = req.body.file

        const {error} = Joi.object({
            firts_name:Joi.string().max(32).required(),
            last_name:Joi.string().max(32).required(),
            birth_date: Joi.number().required(),
            death_date: Joi.number().required(),
            country: Joi.string().required(),
            bio:Joi.string().max(32).required(),
            photo:Joi.required(),
          }).validate({
            firts_name:firts_name?.trim(),
            last_name:last_name?.trim(),
            birth_date: birth_date?.trim(),
            death_date: death_date?.trim(),
            country: country?.trim(),
            bio:bio?.trim(),
            photo:photo?.trim(),
          });

        if (error) throw new CustomError(400, error.message);
    
        const authors = await Author.create({ firts_name, last_name, birth_date, death_date, country, bio, photo});
        authors.save();

        res.json({message: "OK", authors });
      

    } catch(error) {
        next(error) 
    }
}

const findAll = async(req, res, next)=> {
    try{
        const authors = await Author.findAll();

        res.json({message:"OK", authors});
    }catch(error){
        next(error)
    }
};

const findOne = async(req, res, next)=> {
    try{
        const {id} = req.params;
        const authors  = await Author.findAll({where:{id}})
        
        res.json({message: authors});
    }catch(error){
        next(error)
    }
};

module.exports = {create, findAll, findOne}