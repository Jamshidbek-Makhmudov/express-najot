
const {knex} = require("../../database")

const create = async(req, res, next) => {
    try{
        const {name, promocod} = req.body;
        const findComany = await knex("company").select("*").where({name}).first();

        if(findComany)
            return res.status(403).json({message:"Name already exists"})
        const [cpmpany] = await knex("company").insert({name, promocod}).returning("id");


        res.status(201).json({message: "Success"});

    }catch(error){
        next(error);
    }
};

const find = async(req, res, next) => {
    try{
        const {id} = req.params;
        
        const {rows:[users]} = await knex.raw(`select * from company where id = :id`, {id});
        res.json({message:"Ok", data: users})
    
    }catch(error){
        next(error);
    }
};

const findAll = async(req, res, next) => {
    try{

        const users = await knex.select("*").from("company");
        res.json({message: "OK", data: users});

    }catch(error){
        next(error);
    }   
};

module.exports = {find, findAll, create}; 
