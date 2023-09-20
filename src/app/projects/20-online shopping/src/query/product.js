const {fetchOne, fetch} = require("../utils/pg");

const insertCatagory =
  "insert into product(name, kg, price, category_id ) values($1, $2, $3, $4) returning *";

const findCatagory = 
    "select * from product where id=$1";

const findallCatagory = 
    "select * from product";

const removeCatagory = 
    "delete from product where id = $1";

const remove = async (id) =>{
    const data = await fetchOne(removeCatagory, id);
    return data;
}


const findall = async () =>{
    const data = await fetch(findallCatagory);
    return data;
    
}

const find = async (id) =>{
    const data = await fetchOne(findCatagory, id);
    return data;
}

const insert = async (name, kg, price, category_id) =>{
    const data = await fetchOne(insertCatagory, name, kg, price, category_id);
    return data;
}

module.exports = {insert, find, findall, remove};
