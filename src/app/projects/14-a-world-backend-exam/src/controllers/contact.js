const {v4:uuid} = require("uuid");
const path = require("path");
const Joi = require("joi");

const Io = require("../utils/Io");
const contact = new Io(process.cwd() + "/database/contacts.json");

const Contact = require("../models/contact.modul");

const create = async(req, res)=>{
    try{

        const { name, phoneNumber, email, message} = req.body;
      
        const contact_json =  await contact.read();

        const  schema = Joi.object({
            name:Joi.string().min(3).max(20).required(),
            phoneNumber:Joi.string().required(),
            email: Joi.string().required()
        })

        const {error} = schema.validate({name, phoneNumber,email});
        if(error) return res.status(400).json({message:"Error validation"});
        
        const find =contact_json.find((item)=>item.phoneNumber === phoneNumber);
        if(find) return res.json({message:"This phone number already exsits"})
        
        
        if(!find){
            const id = (contact_json[contact_json.length-1]?. id|| 0) +1;

            const newContact = new  Contact(id, name, phoneNumber, email, message);
            const data = contact_json.length?  [...contact_json, newContact]: [newContact];
            await contact.write(data);

            res.json({message:"Created Contact"})
        }
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"INVALID SERVER ERROR"});
    }
}

const getById = async(req, res)=>{
    try{

        const {id} = req.params;
        const contact_json = await contact.read();

        const find = contact_json.find((item)=>item.id==id);

        find.status = true;

        await contact.write(contact_json);
        res.json({message:"Checked"})


    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"INVALID SERVER ERROR"});
    }
}

module.exports = {create, getById};