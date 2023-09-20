const {Pool, Connection} = require("pg")
require('dotenv').config();

//pg.Pool "type":"module"- package.json
const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port: process.env.DB_PORT

    //yoku url bilan connect qilsa boladi:
    //connectionString: process.env.DATABASE_URL
    
     
});


async function fetchAll (SQl, params = []) {
    
    const client = await pool.connect()
     
    try{
        const {rows} = await client.query(SQl, params)
        return rows; 
    } catch(error){
        console.log(`db_error`, error.message);
    } 
    finally{
        await client.release()
    }
}

module.exports = fetchAll; //fetcAlldan array qaytadi fetchOnedan undefined qaytadi agar pustoy kelsa