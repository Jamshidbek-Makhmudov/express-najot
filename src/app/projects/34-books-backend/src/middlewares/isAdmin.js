const Admin = require("../models/admin");
const CustomError = require("../utils/custom-error");


const isAdmin = async(req, res, next)=>{
    try{
        
        const id = req.id;
        const admin = await Admin.findAll({where:{id}})

        if(!admin[0].is_admin) throw new CustomError(403, "Permission denied");

    }catch(error){
        next(error);
    }
}

module.exports  = isAdmin;