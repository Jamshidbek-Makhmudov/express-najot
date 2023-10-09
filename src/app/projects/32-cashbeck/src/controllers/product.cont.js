const {knex} = require("../../database");
const Joi = require("joi");
const nowtime = require("./function");

const create = async(req, res, next) => {
    try{
        const {name_id, price, number } = req.body;
        const cashbeck = Math.floor(Math.random() * 15);        

        const {error} = Joi.object({
            name_id:Joi.number().required(),
            price: Joi.number().required(),
            number :Joi.number().required(),
        }).validate({name_id, price, number});

        if(error) return res.status(400).json({message: error.message});
        
        const [product] = await knex("products")
            .insert({name_id, price, number,cashbeck})
            .returning("*");
   
        res.status(201).json({message:"Success", data: product});

     }catch(error){
        next(error);
    }
};

const update = async(req, res, next) => {
    try{
        const {name_id, price, number} = req.body;
        const {id} = req.params;
        const [data] = await knex("products").update({name_id, price, number}).where({id}).returning("*");
 
  
      res.json({message: "Success", data});
    }catch(error){
        next(error);
    }
};

const remove = async(req, res, next) => {
    try{
        const {id} = req.params;
        await knex("products").del().where({id});
        
        res.json({message: "Success"});

    }catch(error){
        next(error);
    }
};

const find = async(req, res, next) => {
    try{
        const {id} = req.params;
        
        const {rows:[product]} = await knex.raw(`select * from products where id = :id`, {id});
        res.json({message:"Ok", data: product})
    
    }catch(error){
        next(error);
    }   
};

const findAll = async(req, res, next) => {
    try{    
        
        const products = await knex.select("*").from("products");
        res.json({message: "OK", data: products});

    }catch(error){
        next(error)
    }
};

const sellProduct = async(req, res, next)=> {
    try{
        const {id} = req.params;
        const user_id = req.id;
        const {promocod} = req.body;
        let  change = 0;
        let cashchange = 0;
        let amount = 0;

        const product = await knex("products").select("*").where({id});
        const {rows:[users]} = await knex.raw(`select * from users where id = :user_id`, {user_id});
        
        const promocod_id = await knex("company").select("id").where({promocod});
        const promocodId = promocod_id[0].id;

        const promocod_user = await knex.select("*")
        .from('promocods')
        .where(`promocod_id`,`${promocodId}`)
        .innerJoin('users', 'user_id', 'users.id');

   
        if(users.balance > product[0].price && product[0].number > 0){
            change = (+users.balance) - (+product[0].price);
            amount = (+product[0].number)-1;

        } else{
            res.json({message:"Money not enough!"});
        }

        const dbTime = new Date(promocod_user[0].created_at.toString());
        const dbyear = dbTime.getFullYear() +"-"+ (dbTime.getMonth()+1)+"- "+ dbTime.getDate();

        const nowTime = nowtime();
        
        if(dbyear < nowTime){
            res.json({message:"Expired"})
        } else if(dbyear > nowTime){
            cashchange = (+promocod_user[0].balance) + (+product[0].cashbeck);
        }

        const promocod_user_id = promocod_user[0].id;
        
        await knex("products").update({number:amount}).where({id});
        await knex("users").update({balance:cashchange}).where('id',`${promocod_user_id}`);
        await knex("users").update({balance:change}).where('id', `${users.id}`);

        res.status(201).json({message:"Success"});

    }catch(error){
        next(error);
    }
}



module.exports = {find, findAll, create, remove, update, sellProduct}; 
