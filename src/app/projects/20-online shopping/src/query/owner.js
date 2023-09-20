const {fetchOne, fetch} = require("../utils/pg");

const findOwner = 
    "select * from owner where username=$1 and email = $2";


const find = async (username, email) =>{
    const data = await fetchOne(findOwner, username, email);
    return data;
}
module.exports = {find};
