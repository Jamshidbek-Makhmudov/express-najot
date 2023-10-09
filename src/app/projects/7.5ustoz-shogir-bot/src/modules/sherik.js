const {Router} = require("@grammyjs/router");
const {Keyboard} = require("grammy");
const { menu, yesNo } = require("../hepls/button");

const router  = new Router((ctx)=>ctx.session.step);

const birinchi = router.route("birinchi");
birinchi.hears("Sherik kerak", async(ctx)=>{
    await ctx.reply(`<b>Sherik topish uchun ariza berish</b>

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to\'g\'ri bo\'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`,
    {   
         parse_mode:"HTML",

    })
    await ctx.reply(`<b>Ism, familiyangizni kiriting?</b>`,
    {
        parse_mode:"HTML"
    })
    ctx.session.step = "ikkinchi"
});

const ikkinchi = router.route("ikkinchi");
ikkinchi.on("message:text", async(ctx)=>{
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`);
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = "uchinchi"
});


const uchinchi = router.route("uchinchi");
uchinchi.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog\`lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );
    
    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "to'rtinchi";
});


const fourth = router.route("to'rtinchi");
fourth.on("message:text", async(ctx)=>{
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );

    ctx.session.phone = ctx.message.text;
    ctx.session.step = "beshinchi"
});

const beshinchi = router.route("beshinchi");
beshinchi.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Narxi:

To\'lov qilasizmi yoki Tekinmi?
Kerak bo\`lsa, Summani kiriting?`
    );
    ctx.session.hudud =ctx.message.text
    ctx.session.step = "oltinchi"
});

const oltinchi = router.route("oltinchi");
oltinchi.on("message:text", async(ctx)=>{
    await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o\`qiysizmi?
Masalan, Talaba`
    );
    ctx.session.narx =ctx.message.text
    ctx.session.step = "yettinchi"
});


const yettinchi = router.route("yettinchi");
yettinchi.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.kasb = ctx.message.text
    ctx.session.step = "sakkizinchi"
});


const sakkizinchi = router.route("sakkizinchi");
sakkizinchi.on("message:text", async(ctx)=>{
    await ctx.reply(`🔎 Maqsad: 

Maqsadingizni qisqacha yozib bering.`
    );
    ctx.session.vaqt = ctx.message.text
    ctx.session.step = "toqqizinchi"
});



const nine = router.route("toqqizinchi");
nine.on("message:text", async(ctx)=>{
    ctx.session.maqsad = ctx.message.text;
    await ctx.reply(`Sherik kerak:

🏅 Sherik: ${ctx.session.fullname} 
📚 Texnologiya: ${ctx.session.texnologiya} 
🇺🇿 Telegram: ${ctx.from.username} 
📞 Aloqa: ${ctx.session.phone} 
🌐 Hudud: ${ctx.session.hudud} 
💰 Narxi: ${ctx.session.narx} 
👨🏻‍💻 Kasbi: ${ctx.session.kasb} 
🕰 Murojaat qilish vaqti: ${ctx.session.vaqt} 
🔎 Maqsad: ${ctx.session.maqsad} 
    
#sherik #java #Toshkent`);

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...yesNo
        }
    })
    ctx.session.step = "ten";
   
});


const ten = router.route("ten");

ten.hears(`Yoq`, async(ctx)=>{
    await ctx.reply(`Qabul qilinmadi`,{
        reply_markup:{
            ...menu
        }
    })
        
    ctx.session.step = "";    
});

ten.hears("Ha", async(ctx)=>{
    console.log(ctx.message.text);
    await ctx.reply(`📪 So\`rovingiz tekshirish uchun adminga jo\`natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
    reply_markup:{
        ...menu
    }
    })
});


module.exports = router