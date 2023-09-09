const {v4:uuid} = require("uuid");
const path = require("path");
const Joi = require("joi");

const Io = require("../utils/Io");
const feedback = new Io(process.cwd() + "/database/feedbacks.json");

const Feedback = require("../models/feedback.model");


const create = async(req, res)=>{
    try{

        const {name, job, message} = req.body;
        const image = req.files?. photo;

        const feedback_json =  await feedback.read();

        const  schema = Joi.object({
            name:Joi.string().required(),
            image: Joi.required(),
            job:Joi.string().required(),
            message:Joi.string().required()
        })

        const {error} = schema.validate({name, image,job, message});
        if(error) return res.status(400).json({message:"Error validation"});
        
        if(image){

            const mimtype = path.extname(image.name)
            photo = uuid()+mimtype;
            image.mv(path.join(process.cwd(), "uploads", photo))
        }

        const id = (feedback_json[feedback_json.length-1]?. id|| 0) +1;

        const newFeedback = new  Feedback(id, name, job, photo, message);
        const data = feedback_json.length?  [...feedback_json, newFeedback]: [newFeedback];
        await feedback.write(data);

        res.json({message:"Created" })
        
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"INVALID SERVER ERROR"});
    }
}


const updated = async (req, res)=>{
    try {
        const {id} = req.params;
        const {name, message} = req.body;
        const image = req.files?. photo;

        const feedback_json = await feedback.read();
        
        const find = feedback_json.find((item)=>item.id==id);
    
        if(image){

            const mimtype = path.extname(image.name)
            photo = uuid()+mimtype;
            find.photo = photo;
            image.mv(path.join(process.cwd(), "uploads", photo))
        }

        find.name = name;
        find.message = message;
     

        await feedback.write(feedback_json);
        res.json({message: "Updated"})
        
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: "INVALID SERVER ERROR"})
    }

}


const Delete = async (req, res)=>{
    try {
        const {id} = req.params;

        const feedback_json = await feedback.read();

        const find = feedback_json.filter((item)=>item.id!=id);
        
        await feedback.write(find);
        res.json({message: "Deleted"})
        
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: "INVALID SERVER ERROR"})
    }

}


const getById = async (req,res)=>{
    try{
        const {id} = req.params;
        
        const feedback_json = await feedback.read();
        
        const find = feedback_json.find((item)=> item.id == id);
        
        if(find){

            res.json({message:"Successfully", find})
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: error})
        
    }
}


const getAll = async (req, res)=>{
    try {
        const feedback_json = await feedback.read();

        if(feedback_json){
            res.json({feedback: feedback_json})
        }
    } catch(error) {
        res.status(500).json({message: "INVALID SERVER ERROR"})
    }

}


module.exports = {create,updated, getAll, getById, Delete} 















module.exports = {create,updated, getAll, getById, Delete}