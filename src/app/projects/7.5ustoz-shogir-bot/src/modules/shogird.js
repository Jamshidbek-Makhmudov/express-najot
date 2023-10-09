const {Router} = require("@grammyjs/router");

const { menu, yesNo } = require("../hepls/button");

const router  = new Router((ctx)=>ctx.session.step);

const birinchi = router.route("birinchi");
birinchi.hears("Shogird kerak", async(ctx)=>{
    await ctx.reply(`<b>Shogird topish uchun ariza berish</b>

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
    ctx.session.step = "ll"
});


const ll = router.route("ll");
ll.on("message:text", async(ctx)=>{
    await ctx.reply(`🕑 Yosh: 

Yoshingizni kiriting?
Masalan, 19`);
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = "kk"
});


const kk = router.route("kk");
kk.on("message:text", async(ctx)=>{
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    
    ctx.session.yosh = ctx.message.text;
    ctx.session.step = "jj";
});


const jj = router.route("jj");
jj.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog\`lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );

    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "hh"
});





const hh = router.route("hh");
hh.on("message:text", async(ctx)=>{
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.aloqa =ctx.message.text
    ctx.session.step = "gg"
});

const gg = router.route("gg");
gg.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Narxi:

To\'lov qilasizmi yoki Tekinmi?
Kerak bo\`lsa, Summani kiriting?`
    );
    ctx.session.hudud = ctx.message.text
    ctx.session.step = "ff"
});



const ff = router.route("ff");
ff.on("message:text", async(ctx)=>{
    await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o\`qiysizmi?
Masalan, Talaba`);
   
    ctx.session.narx = ctx.message.text;
    ctx.session.step = "dd"
});


const dd = router.route("dd");
dd.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.kasb = ctx.message.text
    ctx.session.step = "ss"
});

const ss = router.route("ss");
ss.on("message:text", async(ctx)=>{
    await ctx.reply(`🔎 Maqsad: 

    Maqsadingizni qisqacha yozib bering.`
    );
    ctx.session.murojatvaqt = ctx.message.text
    ctx.session.step = "aa"
});




const aa = router.route("aa");
aa.on("message:text", async(ctx)=>{
    ctx.session.qoshimcha = ctx.message.text;
    await ctx.reply(`Shogird kerak:

    🎓 Ustoz: ${ctx.session.fullname}
    🌐 Yosh: ${ctx.session.yosh}
    📚 Texnologiya: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: ${ctx.from.username} 
    📞 Aloqa: ${ctx.session.aloqa}
    🌐 Hudud: ${ctx.session.hudud} 
    💰 Narxi: ${ctx.session.narx}
    👨🏻‍💻 Kasbi: ${ctx.session.kasb}
    🕰 Murojaat qilish vaqti: ${ctx.session.murojatvaqt} 
    🔎 Maqsad: ${ctx.session.maqsad}
    
    #shogird`
    );

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...yesNo
        }
    })
    ctx.session.step = "zz";
   
});


const zz = router.route("zz");

zz.hears(`Yoq`, async(ctx)=>{
    await ctx.reply(`Qabul qilinmadi`,{
        reply_markup:{
            ...menu
        }
    })
        
    ctx.session.step = "";    
});


zz.hears("Ha", async(ctx)=>{
    console.log(ctx.message.text);
    await ctx.reply(`📪 So\`rovingiz tekshirish uchun adminga jo\`natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
    reply_markup:{
        ...menu
    }
    })
});


module.exports = router