const {Pool} = require("pg");
const config = require("../../config");

const pool = new Pool({
  connectionString: config.DB_URL,
});

const fetch = async (SQL, ...values) => {
  const client = await pool.connect();

  try {
    const {rows} = await client.query(SQL, values.length ? values : null);

    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

const fetchOne = async (SQL, ...values) => {
  const client = await pool.connect();

  try {
    const {
      rows: [row],
    } = await client.query(SQL, values.length ? values : null);

    return row;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

module.exports = {
  fetch,
  fetchOne,
};

//bu 10mln ta query insert qilib beradi
// const bootstrap = async () => { 
//   for (let i = 0; i < 10000000; i++) {
//     await pg("insert into passports(id,value1,...)values($1,$2,...)",`AA${i}`,`value1...`,i);

    
//   }
// };
//bootstrap();