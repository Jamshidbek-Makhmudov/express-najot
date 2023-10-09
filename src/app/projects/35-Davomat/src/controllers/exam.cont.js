const Joi = require("joi");

const examModel = require("../models/exam.model");
const CustomError = require("../utils/custom-error");


const create = async(req, res, next) =>{
    try{
        const {name, topshiriq, endTime, group_id } = req.body;
    
        const {error} = Joi.object({
            name:Joi.string().required(),
            topshiriq:Joi.string().required(),
            endTime:Joi.date().required(),
            
        }).validate({
            name: name?.trim(),
            topshiriq: topshiriq?.trim(),
            endTime: endTime?.trim(),
        });

        if(error) throw new CustomError(400, error.message);

        const exam = await examModel.create({name, topshiriq, endTime, group_id});

        res.json({message:"OK", exam});


    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const find = async(req, res, next) =>{
    try{
        const exams = await examModel.find().populate("group_id").exec();
        res.json({exams});
        
    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const findOne = async(req, res, next) =>{
    try{
        const {id} = req.params;
        
        const exam = await examModel.findById(id).populate("group_id");
        res.json({exam});

    }catch(error){
        console.log(error.message);
        next(error)
    }
}


module.exports = {create, find, findOne,}