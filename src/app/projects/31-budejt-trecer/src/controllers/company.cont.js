const bcrypt = require("bcrypt");
const Joi = require("joi");

const {knex} = require("../../database");
const CustomError = require("../utils/custom-error");


const findAllC1 = async(req, res, next)=>{
    try{
        const data = await knex("category1").select("*");
    
        res.json({message: "Success", data});

    }catch(error){
        next(error)
    }
};

const findAllC2 = async(req, res, next)=>{
    try{
        
        const data = await knex("category2").select("*");
    
        res.json({message: "Success", data});


    }catch(error){
        next(error)
    }
};

const findOneC1 = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const user_id = req.r_id;

        const category1 = await knex("category1").select("*").where('c1_id',`${id}`);
        const user =  await knex("register").select("balance").where('r_id',`${user_id}`);

        const status = "get";
        const h_price =  category1[0].c1_price;
        const h_name = category1[0].c1_name;
        const h_id =  user_id;

        if(user[0].balance > 0){
            sum = user[0].balance + h_price
        } else{
            res.json({message:"Money not enough"})
        }

        
        await knex("register").update({balance:sum}).where('r_id',`${user_id}`);

        const [history] = await knex("history")
            .insert({h_id, h_name, h_price, status})
            .returning("*");


        res.status(201).json({message:"Success", data:history});
    }catch(error){
        next(error)
    }
};

const findOneC2 = async(req, res, next)=>{
    try{

        const {id} = req.params;
        const user_id = req.r_id;
        
        const category2 = await knex("category2").select("*").where('c2_id',`${id}`);
        const user =  await knex("register").select("balance").where('r_id',`${user_id}`);
        console.log(user, category2);
        const status = "buy";
        const h_price =  category2[0].c2_price;
        const h_name = category2[0].c2_name;
        const h_id =  user_id;

        if(user[0].balance > h_price){
            sum = user[0].balance - h_price
        } else{
            res.json({message:"Money not enough"})
        }

        
        await knex("register").update({balance:sum}).where('r_id',`${user_id}`);

        const [history] = await knex("history")
            .insert({h_id, h_name, h_price, status})
            .returning("*");


        res.status(201).json({message:"Success", data:history});
    }catch(error){
        next(error)
    }
};

const check = async(req,res, next)=>{
    try{
        const {rows:[history]} = await knex.raw(`
        select t2.h_id as id_h, t2.status as st,sum(t2.sumall) as su,t2.every_month as em 
        from (select t1.h_id, t1.status,sum(t1.h_price) as sumall,
        extract(month from t1.created_at) as every_month from history t1
        group by t1.h_id, t1.status, every_month) t2 group by id_h, st,em`);

        console.log(history);
        res.status(201).json({message:"Success", data: history});
    }catch(error){
        next(error);
    }
}


module.exports = {
    findAllC1,
    findAllC2,
    findOneC1,
    findOneC2,
    check
  }