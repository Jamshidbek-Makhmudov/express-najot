const query = require("../query/history");

const  create = async(req, res)=>{
    try{
        const {workers_id, product_id, is_sell, kg, price} = req.body;
        
        const data = await query.insert(workers_id, product_id, is_sell, kg, price);
     
        const Kg = data.kg;
        const productId = data.product_id;
        
        const check = await query.check(productId);
        if(check.kg>Kg){
            const datas = await query.Minus(Kg, productId);
          

        }else{
            res.status(201).json({message:"Kg not enough"})
        }

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

const findYear = async(req, res)=>{
    try{

        const {date1, date2} = req.body;

        const data = await query.findYear(date1, date2);
        console.log(data);

        
        res.json({message:"successfully", data });

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})

    }
}

module.exports = {create, findAll, find, findYear}