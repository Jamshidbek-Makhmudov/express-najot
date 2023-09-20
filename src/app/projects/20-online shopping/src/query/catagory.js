const {fetchOne, fetch} = require("../utils/pg");

const insertCatagory =
  "insert into category(name, is_active) values($1, $2) returning *";

const findCatagory = 
    "select * from category where name=$1";

const findallCatagory = 
    "select * from category";

const updateCatagory = 
    "update category set name = $1 where id = $2 returning*";

const removeCatagory = 
    "delete from category where id = $1";



const findall = async () =>{
    const data = await fetch(findallCatagory);
    return data;
    
}

const find = async (id) =>{
    const data = await fetchOne(findCatagory, id);
    return data;
}

const insert = async (name, is_active) =>{
    const data = await fetchOne(insertCatagory, name, is_active);
    return data;
}
const update = async (name, id) =>{
    const data = await fetchOne(updateCatagory, name, id);
    return data;
}
const remove = async (id) =>{
    const data = await fetchOne(removeCatagory, id);
    return data;
}


module.exports = {insert, update, find, findall, remove};
