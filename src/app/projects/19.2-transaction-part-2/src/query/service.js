const {fetchOne, fetch} = require("../utils/pg");

const insertservices =
  "insert into servicess(register_id, service, price) values($1, $2, $3) returning *";

const findAllservices = 
    "select * from servicess;";

const findOneServices = 
    "select * from servicess where id=$1;";

const findUserfromRe  = 
    "select * from registerr where id = $1;";


const findUsertoRe  = 
    "select * from registerr where id = $1;";



const insert = async (userId,service, price) =>{
    const data = await fetchOne(insertservices,userId, service, price);
    return data;
    
}

const findAll = async () =>{
    const data = await fetch(findAllservices);
    console.log(data);
    return data;
}

const findOne = async (id) =>{
    const serviceid = await fetchOne(findOneServices, id);
    return serviceid;
}

const findUserfrom = async(reg_id)=>{
    const data = await fetchOne(findUserfromRe, reg_id);
    return data;
}


const findUserto = async(reg_id)=>{
    const data = await fetchOne(findUsertoRe, reg_id);
    return data;
}



module.exports = {insert, findAll, findOne,findUserfrom,findUserto,
  beginTransaction: async () => await fetchOne("BEGIN TRANSACTION"),
  rollBackTransaction: async () => await fetchOne("ROLLBACK"),
  commitTransaction: async () => await fetchOne("COMMIT")
};
