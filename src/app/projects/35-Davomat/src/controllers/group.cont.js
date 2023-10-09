
const Joi  = require("joi");
const CustomError = require("../utils/custom-error");
const groupModel = require("../models/group.model");

const create = async(req, res, next) =>{
    try{
        const {number, name} = req.body;
  
        const {error} = Joi.object({
            number:Joi.number().required(),
            name:Joi.string().required(),
        }).validate({
            number:number?.trim(),
            name:name?.trim(),
        })

        if(error) throw new CustomError(400, message);

        const groups = await groupModel.find({number});
    
        if(groups.length) res.json({menubar:"This number already exsits"});


        const group = await groupModel.create({number, name})

        res.json({message:"OK", group});

    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const find = async(req, res, next) =>{
    try{
        const groups = await groupModel.aggregate([{
            $lookup:{
                from:'pupils',
                localField:'_id',
                foreignField:"group_id",
                as:'pupils'
        }}])

        res.json({groups});

    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const findOne = async(req, res, next) =>{
    try{
        const {id} = req.params;

        const group = await groupModel.findById(id);

        res.json({group})
    }catch(error){
        console.log(error.message);
        next(error)
    }
}


module.exports = {create, find, findOne,}