const {Router} = require("@grammyjs/router");
const {Keyboard} = require("grammy");
const { menu, yesNo } = require("../hepls/button");

const router  = new Router((ctx)=>ctx.session.step);

const birinchi = router.route("birinchi");
birinchi.hears("Ish joyi kerak", async(ctx)=>{
    await ctx.reply(`<b>Ish joyi topish uchun ariza berish</b>

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
    ctx.session.step = "a"
});

const a = router.route("a");
a.on("message:text", async(ctx)=>{
    await ctx.reply(`🕑 Yosh: 

Yoshingizni kiriting?
Masalan, 19`);
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = "b"
});


const b = router.route("b");
b.on("message:text", async(ctx)=>{
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    
    ctx.session.yosh = ctx.message.text;
    ctx.session.step = "c";
});


const c = router.route("c");
c.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog\`lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );

    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "d"
});





const d = router.route("d");
d.on("message:text", async(ctx)=>{
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.aloqa =ctx.message.text
    ctx.session.step = "f"
});


const f = router.route("f");
f.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Narxi:

Tolov qilasizmi yoki Tekinmi?
Kerak bo\`lsa, Summani kiriting?`
    );
    ctx.session.hudud = ctx.message.text
    ctx.session.step = "j"
});


const j = router.route("j");
j.on("message:text", async(ctx)=>{
    await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o\`qiysizmi?
Masalan, Talaba`
    );
    ctx.session.narx = ctx.message.text
    ctx.session.step = "h"
});

const h = router.route("h");
h.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.kasb = ctx.message.text
    ctx.session.step = "i"
});



const i = router.route("i");
i.on("message:text", async(ctx)=>{
    await ctx.reply(`🔎 Maqsad: 

Maqsadingizni qisqacha yozib bering.`
    );
    ctx.session.vaqt = ctx.message.text
    ctx.session.step = "k"
});



const k = router.route("k");
k.on("message:text", async(ctx)=>{
    ctx.session.maqsad = ctx.message.text;
    await ctx.reply(`Ish joyi kerak:

    👨‍💼 Xodim: ${ctx.session.fullname}
    🕑 Yosh: ${ctx.session.yosh}
    📚 Texnologiya: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: ${ctx.from.username} 
    📞 Aloqa: ${ctx.session.aloqa}
    🌐 Hudud: ${ctx.session.hudud} 
    💰 Narxi: ${ctx.session.narx} 
    👨🏻‍💻 Kasbi: ${ctx.session.kasb}
    🕰 Murojaat qilish vaqti: ${ctx.session.vaqt} 
    🔎 Maqsad: ${ctx.session.maqsad} `
    );

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...yesNo
        }
    })
    ctx.session.step = "l";
   
});


const l = router.route("l");

l.hears(`Yoq`, async(ctx)=>{
    await ctx.reply(`Qabul qilinmadi`,{
        reply_markup:{
            ...menu
        }
    })
        
    ctx.session.step = "";    
});


l.hears("Ha", async(ctx)=>{
    console.log(ctx.message.text);
    await ctx.reply(`📪 So\`rovingiz tekshirish uchun adminga jo\`natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
    reply_markup:{
        ...menu
    }
    })
});


module.exports = router