const {fetchOne, fetch} = require("../utils/pg");

const insertCatagory =
  "insert into workers(fullname, email, password ) values($1, $2, $3) returning *";

const findCatagory = 
    "select * from workers where id=$1";

const findallCatagory = 
    "select * from workers";

const removeCatagory = 
    "update workers set is_active = $1 where id = $2";

const remove = async (is_active,id) =>{
    const data = await fetchOne(removeCatagory,is_active,id);
    return data;
}


const findall = async () =>{
    const data = await fetchOne(findallCatagory);
    return data;
    
}

const find = async (id) =>{
    const data = await fetchOne(findCatagory, id);
    return data;
}

const insert = async (fullname, email, password) =>{
    const data = await fetchOne(insertCatagory,fullname, email, password);
    return data;
}

module.exports = {insert, find, findall, remove};
