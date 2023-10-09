const {Bot, InputFile, } = require("grammy");
const Io = require("./src/utils/Io");
const {createReadStream} = require("fs")

const UserClass = require("./src/models/User.models");  
const SendClass = require("./src/models/Send.models");

const isAuth = require("./src/middlewares/isAuth");
const isJoin = require("./src/middlewares/isJoin");

const Users = new Io(process.cwd() + "/database/user.json");
const Sends = new Io(process.cwd() + "/database/send.json");

const config = require("./config");
const bot = new Bot(config.token);


bot.command("start", async(ctx)=>{
    await ctx.reply("File yoki rasm yoki video yuboring");
})

bot.use(isAuth.isAuth);
bot.use(isJoin);


bot.on("message", async(ctx)=>{
    const users = await Users.read();
    const sends = await Sends.read();
    let  message, type;
    const id = ctx.message.text;
    const userId = ctx.from.id;

    if(ctx.message.photo){
        message = ctx.message.photo;
        type = "photo";
        
    
        const sendID =(sends[sends.length-1]?.sendID||0)+1 ;
        const find = users.find((item) => item.userId==userId);

        if(find){
            const newSend = new SendClass(sendID, message,type, userId);
            const data = sends.length? [...sends, newSend]: [newSend];
    
            await Sends.write(data);
            await ctx.reply(sendID);


        }
    } else if(ctx.message.video){
        message = ctx.message.video;
        type = "video";
        
    
        const sendID =(sends[sends.length-1]?.sendID||0)+1 ;
        const find = users.find((item) => item.userId==userId);

        if(find){
            const newSend = new SendClass(sendID, message,type, userId);
            const data = sends.length? [...sends, newSend]: [newSend];
    
            await Sends.write(data);
            await ctx.reply(sendID);


        }
    } else if(ctx.message.text){
        const sends = await Sends.read();

        const find = sends.find((item)=>item.sendID==id && item.userId == userId);

        if(find){
            if(find.type ==="photo"){
                console.log(find.message);
                await ctx.replyWithPhoto(find.message[find.message.length-1].file_id);
            } else if(find.type === "video")
            {
                console.log(find.message.file_name);
                
                await ctx.replyWithVideo(new InputFile(find.message.file_name))
                 
            }
        }
    }


})



bot.catch((e)=>{
    console.log(e);
})


bot.start();
