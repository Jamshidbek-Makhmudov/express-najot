const query = require("../query/worker");

const  create = async(req, res)=>{
    try{
        const {fullname, email, password} = req.body;
        
        const data = await query.insert(fullname, email, password);
        console.log(data);

        res.json({message:"successfully", data });

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
};


const  findAll = async(req, res)=>{
    try{
        const data = await query.findall();
        console.log(data);

        
        res.json({message:"successfully", data });

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})

    }
};


const  find = async(req, res)=>{
    try{

        const {id} = req.params;

        const data = await query.find(id);
        console.log(data);

        
        res.json({message:"successfully", data });

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})

    }
};


const  remove = async(req, res)=>{
    try{

        const {id} = req.params;
        const is_active = false;

        const data = await query.remove(is_active, id);
        console.log(data);

        
        res.json({message:"deleted", data });

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})

    }
};




module.exports =  {create, findAll, find, remove}