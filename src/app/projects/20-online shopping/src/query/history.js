const {fetchOne, fetch} = require("../utils/pg");

const insertCatagory =
  "insert into history(workers_id, product_id, is_sell, kg, price ) values($1, $2, $3, $4, $5) returning *";

const findCatagory = 
    "select * from history where id=$1";

const findallCatagory = 
    "select * from history";

const balance =
    "select kg from product where id = $1";


const minus = 
    "update product set kg = kg - $1 where id = $2 ";

const findYearHistory = 
"SELECT  a.name, CAST(e.created_at AS DATE) as month, SUM(e.kg) AS total_amount FROM history e, product a WHERE a.id=e.product_id and e.created_at BETWEEN $1 AND $2 GROUP BY month,a.name ORDER BY month";

const findall = async () =>{
    const data = await fetch(findallCatagory);
    return data;
    
}

const check = async(id)=>{
    const data = await fetchOne(balance, id);
    return data;
}


const Minus = async (Kg, product_id) =>{
    const data = await fetch(minus, Kg, product_id);
    return data;
    
}


const find = async (id) =>{
    const data = await fetchOne(findCatagory, id);
    return data;
}

const insert = async (workers_id, product_id, is_sell, kg, price) =>{
    const data = await fetchOne(insertCatagory,workers_id, product_id, is_sell, kg, price);
    return data;
}

const findYear = async(date1, date2)=>{
    const data = await fetchOne(findYearHistory, date1, date2);
    return data; 
}

module.exports = {insert, find, findall, Minus, check,findYear};
