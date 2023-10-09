const {Composer, Keyboard} = require("grammy");
const { menu } = require("../hepls/button");
const bot = new Composer();


bot.command("start", async(ctx)=>{
    await ctx.reply(`<b>Assalom alaykum ${ctx.from.first_name}
UstozShogird kanalining rasmiy botiga xush kelibsiz!</b>
    
/help yordam buyrugi orqali nimalarga qodir ekanligimni bilib oling!`,
{
    parse_mode:"HTML",
    reply_markup:{
        ...menu
    }
});

console.log(ctx.from.first_name);
})

bot.command("help", async(ctx)=>{
    
    await ctx.reply(`UzGeeks faollari tomonidan tuzilgan Ustoz-Shogird kanali. 

    Bu yerda Programmalash bo\`yicha
      #Ustoz,  
      #Shogird,
      #oquvKursi,
      #Sherik,  
      #Xodim va 
      #IshJoyi 
     topishingiz mumkin. 
    
    E'lon berish: @UstozShogirdBot
    
    Admin @UstozShogirdAdminBot`);
})



module.exports = bot;

