const {v4:uuid} = require("uuid");
const path = require("path");
const Joi = require("joi");

const Io = require("../utils/Io");
const services = new Io(process.cwd() + "/database/serviceses.json");

const Services = require("../models/service.model");

const create = async(req, res)=>{
    try{

        const {name, description} = req.body;
        const image = req.files?. photo;

        const services_json =  await services.read();

        const  schema = Joi.object({
            name:Joi.string().required(),
            image: Joi.required()
        })

        const {error} = schema.validate({name, image});
        if(error) return res.status(400).json({message:"Error validation"});
        
        if(image){

            const mimtype = path.extname(image.name)
            photo = uuid()+mimtype;
            image.mv(path.join(process.cwd(), "uploads", photo))
        }

        const id = (services_json[services_json.length-1]?. id|| 0) +1;

        const newServices = new  Services(id, name,description, photo );
        const data = services_json.length?  [...services_json, newServices]: [newServices];
        await services.write(data);

        res.json({message:"Created" })
        
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"INVALID SERVER ERROR"});
    }
}


const updated = async (req, res)=>{
    try {
        const {id} = req.params;
        const {name, description} = req.body;
        
        const services_json = await services.read();

        const find = services_json.find((item)=>item.id==id);
        find.name = name;
        find.description = description;
        console.log(find.name, find.description);

        await services.write(services_json);
        res.json({message: "Updated"})
        
    } catch(error) {
        res.status(500).json({message: "INVALID SERVER ERROR"})
    }

}



const getById = async (req,res)=>{
    try{
        const {id} = req.params;
        
        const services_json = await services.read();
        
        const find = services_json.find((item)=> item.id == id);
        
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
        const services_json = await services.read();

        if(services_json){
            res.json({Services: services_json})
        }
    } catch(error) {
        res.status(500).json({message: "INVALID SERVER ERROR"})
    }

}


const Delete = async (req, res)=>{
    try {
        const {id} = req.params;
        const services_json = await services.read();

        const find = services_json.filter((item)=>item.id!=id);

        await services.write(find);
        res.json({message: "Deleted"})
        
    } catch(error) {
        res.status(500).json({message: "INVALID SERVER ERROR"})
    }

}


module.exports = { create,updated, getById, getAll, Delete};