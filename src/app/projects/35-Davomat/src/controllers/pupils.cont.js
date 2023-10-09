const Joi = require("joi");

const CustomError = require("../utils/custom-error");
const pupilsModel = require("../models/pupils.model");
const { generateToken } = require("../utils/jwt");


const create = async(req, res, next) =>{
    try{
        const {firstname, lastname, age, phoneNumber, group_id, password} = req.body;
        
        const {error} = Joi.object({
            firstname: Joi.string().max(32).required(),
            lastname: Joi.string().required(),
            age: Joi.number().required(),
            phoneNumber: Joi.string().required(),
            password: Joi.string().required(),
            group_id: Joi.required(),
          }).validate({
            firstname: firstname?.trim(),
            lastname: lastname?.trim(),
            age: age?.trim(),
            phoneNumber: phoneNumber?.trim(),
            group_id: group_id?.trim(),
            password: password?.trim(),
          });
      
        if (error) throw new CustomError(400, error.message);
        
        const pupils = await pupilsModel.create({
            firstname, 
            lastname,
            age,
            phoneNumber,
            group_id,
            password
        })

      
        res.status(201).json({message:"OK", pupils});
    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const login = async(req, res, next) =>{
    try{
        const {id, password} = req.body;
        
        const pupils = await pupilsModel.findById(id);
     
        if(id==pupils.id && password==pupils.password){
            
            const token = generateToken({id: pupils._id});
            res.status(201).json({message: "Success", data: token});

        } else res.json({message:"Invalid password or id"});


    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const findUser = async(req, res, next) =>{
    try{
        const {id} = req.verify;
        const pupil = await pupilsModel.findById(id).populate("group_id");

        res.json({pupil})

    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const findOne = async(req, res, next) =>{
    try{
        const {id} = req.params;
        console.log("id", req.params);

        const pupil = await pupilsModel.findById(id).populate("group_id");
        res.json({pupil})

    }catch(error){
        console.log(error.message);
        next(error)
    }
};


const findAll = async(req, res, next) =>{
    try{
        
        const pupil = await pupilsModel.aggregate([
            {
            $lookup:{
                from:'groups',
                localField:'group_id',
                foreignField:"_id",
                as:'group',
            }},
        ])

        res.json({pupil})
        
    }catch(error){
        console.log(error.message);
        next(error)
    }
};



module.exports = {create, login, findAll, findUser, findOne}