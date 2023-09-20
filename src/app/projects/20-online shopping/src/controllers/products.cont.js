const query = require("../query/product");


const  create = async(req, res)=>{
    try{
        const {name, kg, price, category_id} = req.body;
        
        const data = await query.insert(name, kg, price, category_id);
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

        const data = await query.remove(id);
        console.log(data);

        res.json({message:"deleted", data });

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})

    }
};


module.exports = {create, findAll, find, remove}