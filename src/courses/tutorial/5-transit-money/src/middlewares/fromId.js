const Io = require("../utils/Io");
const user = new Io(process.cwd() + "/database/user.json")

const fromId = async(req, res, next)=>{
    const userID = req.headers.authorization;
    const users = await user.read();

    const find = users.find((item)=>item.id==userID);
    
    if(find){
        req.user = find;
        next();
    } else{
        res.status(403).json({message:"This id not foundd or money not enough"});
    }

}

module.exports = fromId;