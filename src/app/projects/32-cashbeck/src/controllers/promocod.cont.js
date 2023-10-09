const {knex} = require("../../database");
const Joi = require("joi")

const create = async(req, res, next) => {
    try{
        const {promocod_id,user_id,created_at } = req.body;
        
        const {error} = Joi.object({
            promocod_id: Joi.number().required(),
            user_id: Joi.number().required(),
        }).validate({promocod_id, user_id});
      
        if(error) return res.status(400).json({message: error.message});

        const [promocod] = await knex("promocods").insert({promocod_id, user_id, created_at}).returning("*");

        res.status(200).json({message: "Success", data: promocod});
      
    }catch(error){
        next(error);
    }
};

const findAll = async(req, res, next) => {
    try{
        const promocod = await knex
        .from('promocods')
        .innerJoin('company', 'promocod_id', 'company.id');

        res.status(200).json({message:"success", promocod});


    }catch(error){
        next(error);
    }    

};





module.exports = { findAll, create}; 
