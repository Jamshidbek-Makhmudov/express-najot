const  query  = require("../query/owner");
const config = require("../../config");
const jwt = require("jsonwebtoken");

const  find = async(req, res)=>{
    try{
        const {username, email} = req.body;
        
        const data = await query.find(username, email);
        console.log(data);

        const token = jwt.sign({id:data.id}, config.JsonWebToken_key, {expiresIn:"72h"})
        res.json({message:"successfully", token });

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
};


module.exports = {find}