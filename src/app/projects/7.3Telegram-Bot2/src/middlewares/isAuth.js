const Io =require("../utils/Io");

const UserClass = require("../models/User.models");
const Users = new Io(process.cwd() + "/database/user.json");


const isAuth = async(ctx, next)=>{
    const users = await Users.read();

    const userId = ctx.from.id;
    const findUser = users.find((item)=>item.userId == userId);
    

    if(!findUser){
        const newUser = new UserClass(userId, ctx.from.first_name);

        const data = users.length? [...users, newUser]: [newUser];
        await Users.write(data);
    }
    
    next();
}


module.exports = {
    isAuth,

};