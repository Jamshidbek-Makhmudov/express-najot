const {Router} = require("@grammyjs/router");

const { menu, yesNo } = require("../hepls/button");

const router  = new Router((ctx)=>ctx.session.step);

const birinchi = router.route("birinchi");
birinchi.hears("Ustoz kerak", async(ctx)=>{
    await ctx.reply(`<b>Ustoz topish uchun ariza berish</b>

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
    ctx.session.step = "qq"
});


const qq = router.route("qq");
qq.on("message:text", async(ctx)=>{
    await ctx.reply(`🕑 Yosh: 

Yoshingizni kiriting?
Masalan, 19`);
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = "ww"
});


const ww = router.route("ww");
ww.on("message:text", async(ctx)=>{
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    
    ctx.session.yosh = ctx.message.text;
    ctx.session.step = "ee";
});


const ee = router.route("ee");
ee.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog\`lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );

    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "rr"
});





const rr = router.route("rr");
rr.on("message:text", async(ctx)=>{
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.aloqa =ctx.message.text
    ctx.session.step = "tt"
});

const tt = router.route("tt");
tt.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Narxi:

To\'lov qilasizmi yoki Tekinmi?
Kerak bo\`lsa, Summani kiriting?`
    );
    ctx.session.hudud = ctx.message.text
    ctx.session.step = "yy"
});




const yy = router.route("yy");
yy.on("message:text", async(ctx)=>{
    await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o\`qiysizmi?
Masalan, Talaba`);
   
    ctx.session.narx = ctx.message.text;
    ctx.session.step = "uu"
});


const uu = router.route("uu");
uu.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.kasb = ctx.message.text
    ctx.session.step = "ii"
});

const ii = router.route("ii");
ii.on("message:text", async(ctx)=>{
    await ctx.reply(`🔎 Maqsad: 

    Maqsadingizni qisqacha yozib bering.`
    );
    ctx.session.murojatvaqt = ctx.message.text
    ctx.session.step = "pp"
});




const pp = router.route("pp");
pp.on("message:text", async(ctx)=>{
    ctx.session.qoshimcha = ctx.message.text;
    await ctx.reply(`Ustoz kerak:

    🎓 Shogird: ${ctx.session.fullname}
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
    ctx.session.step = "mm";
   
});


const mm = router.route("mm");

mm.hears(`Yoq`, async(ctx)=>{
    await ctx.reply(`Qabul qilinmadi`,{
        reply_markup:{
            ...menu
        }
    })
        
    ctx.session.step = "";    
});


mm.hears("Ha", async(ctx)=>{
    console.log(ctx.message.text);
    await ctx.reply(`📪 So\`rovingiz tekshirish uchun adminga jo\`natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
    reply_markup:{
        ...menu
    }
    })
});


module.exports = router