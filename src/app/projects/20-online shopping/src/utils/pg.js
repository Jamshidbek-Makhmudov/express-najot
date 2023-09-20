const {Pool} = require("pg");
const config = require("../../config");

const pool = new Pool({
    connectionString:config.DB_URL,
});

const fetch = async (SQL, ...values)=>{
    const client = await pool.connect();

    try{
        const {rows} = await client.query(SQL, values.length? values : null);
        return rows;
    } catch(error){
        console.log(error);
    } finally{
        client.release();
    }
};

const fetchOne = async (SQl, ...values)=>{
    const client = await pool.connect();
    try{
        const {rows:[row],} = await client.query(SQl, values.length? values : null);

        return row;
    }catch(error){
        console.log(error);
    } finally{
        client.release();
    }
};
  
module.exports = {fetch, fetchOne}
