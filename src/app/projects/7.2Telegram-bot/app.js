const {Bot, Keyboard, InputFile} = require("grammy");
const geodist = require("geodist")

const bot = new Bot(/** " your telegrsm bot link"*/)

bot.command("start", async (ctx)=>{
    await ctx.reply(
        `<i>Assalomu alaykum  ${ctx.from.first_name}</i>`,
        {
            parse_mode:"HTML",
            reply_markup: new Keyboard().requestLocation("Location").resized()

        }
        );
});


bot.command("video",async(ctx)=>{
    await ctx.replyWithVideo(new InputFile("./video.mp4"))
} )

bot.command("help", async(ctx)=>{
    await ctx.reply("Hech qanday yordam berilmadi!")
})



bot.api.setMyCommands([
    {command:"start", description:"Start"},
    {command: "help", description:"Help"},
    {command: "video", description:"Video"}
]);

bot.on(":photo", async(ctx)=>{
    await ctx.reply("Chiroyli rasm")
});

bot.on(":location", async(ctx)=>{
    const a = ctx.message.location.latitude;
    const b = ctx.message.location.longitude;
    const c = 41.285643;
    const d = 69.203823;
    console.log(a,b);
    
    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
  
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadiusKm = 6371; // Earth's radius in kilometers
        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);
  
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
        const distance = earthRadiusKm * c;
        return distance;
    }

    const distance = calculateDistance(a, b,c, d);
    const result = Math.floor(distance); 
    await ctx.reply(`Siz najot talimdan ${result} km uzoqsiz`);

})

bot.start();


// console.log(ctx.message.location.latitude);
// const dis = geodist({lat:41.285643, long:69.203823}, ctx.message.location)
// console.log(dis);
// const sum = dis*1.60934
// console.log(sum);
// await ctx.reply(`Siz najot talimdan ${sum} km uzoqsiz`)
//41.327576 69.25573