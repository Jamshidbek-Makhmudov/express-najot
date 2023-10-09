
const sequelize = require("../database");
const Book = require("../models/book");
const Reads = require("../models/reads");
const User = require("../models/user");

const update = async(req, res, next)=> {
    try{
        
    const user = req.id;
    const {tavallud, manzil, bio} = req.body;
    const id  = user;
    const photo = req.body.file;

    await User.update({photo, tavallud, manzil, bio},{where:{id}});


    res.json({message:"OK",})
    }catch(error){
        next(error)
    }
}

const balanceUpdate = async(req, res, next)=> {
    try{
        const id = req.id;
        const {balance} = req.body;

        await User.update({balance}, {where:{id}});

        res.json({message:"OK"});
    } catch(error) {
        next(error)
    }
}


const updateEmail = async(req, res, next)=> {
    try{
        const {email, current_password, new_passwrod,confirim_password } = req.body;
        const user = req.user;

        const userEmail = user[0].email;
        const id = user[0].id;
        const userPassword = user[0].password;

        if(email==userEmail && current_password==userPassword){
            if(new_passwrod==confirim_password){
                
                await User.update({email,password:`${new_passwrod}`},{where:{id}});
            }else{
                res.json({message:"confirim password is error"})
            }
        } else{
            res.json({message:"Email or password  invalid"})
        }


        res.json({message:"OK"})

    }catch(error){
        next(error)
    }
};

const find = async(req, res, next)=> {
    try{
        const id = req.id;
        const find = await User.findAll({include:[{model:Reads, include:[{model:Book}]}]}, {where:{id}});
        
        res.json({message:"Success", data:find})
    }catch(error){
        next(error)
    }
};

const buyBook = async(req, res, next)=>{

    const user = req.user;
    let {id} = req.params;
    const trx  = await sequelize.transaction();
    
    try{
        const book = await Book.findAll({where:{id}});
        
        let balance=0;
        if (user[0].balance>book[0].price){
            balance = user[0].balance-book[0].price;
        } else{
            res.json({message:"Money not enough"})
            return;
        }
        
        id = req.id;
        await User.update({balance}, {where:{id}}, {transaction:trx});
        const user_id = id;
        const book_id = book[0].id;

        await trx.commit();
        (await Reads.create({user_id, book_id})).save();

        res.json({message:"OK"});
    }catch(error){
        
        await trx.rollback();
        next(error);
    }
}


module.exports = { update, updateEmail, find, buyBook, balanceUpdate}