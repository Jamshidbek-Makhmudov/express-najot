const {Pool} = require("pg");
const config = require("../../config");

const pool = new Pool({
    connectionString:config.DB_URL
});

const fetch =  async(SQL, ...values)=>{
    const client = await pool.connect();
    
}