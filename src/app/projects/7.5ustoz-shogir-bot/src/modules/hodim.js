const {Router} = require("@grammyjs/router");

const { menu, yesNo } = require("../hepls/button");

const router  = new Router((ctx)=>ctx.session.step);

const birinchi = router.route("birinchi");
birinchi.hears("Hodim kerak", async(ctx)=>{
    await ctx.reply(`<b>Xodim topish uchun ariza berish</b>

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to\'g\'ri bo\'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`,
    {   
         parse_mode:"HTML",

    })
    await ctx.reply(`<b>🎓 Idora nomi?</b>`,
    {
        parse_mode:"HTML"
    })
    ctx.session.step = "q"
});



const q = router.route("q");
q.on("message:text", async(ctx)=>{
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    
    ctx.session.Idora = ctx.message.text;
    ctx.session.step = "e";
});


const e = router.route("e");
e.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog\`lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );

    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "r"
});





const r = router.route("r");
r.on("message:text", async(ctx)=>{
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.aloqa =ctx.message.text
    ctx.session.step = "t"
});

const t = router.route("t");
t.on("message:text", async(ctx)=>{
    await ctx.reply(`✍️Mas'ul ism sharifi?`);
   
    ctx.session.hudud = ctx.message.text;
    ctx.session.step = "y"
});


const y = router.route("y");
y.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.fullname = ctx.message.text
    ctx.session.step = "u"
});

const u = router.route("u");
u.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Ish vaqtini kiriting?`
    );
    ctx.session.murojatvaqt = ctx.message.text
    ctx.session.step = "z"
});



const z = router.route("z");
z.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Maoshni kiriting?`
    );
    ctx.session.ishvaqt = ctx.message.text
    ctx.session.step = "o"
});





const o = router.route("o");
o.on("message:text", async(ctx)=>{
    await ctx.reply(`‼️ Qo\`shimcha ma\`lumotlar?`
    );
    ctx.session.maosh = ctx.message.text
    ctx.session.step = "p"
});



const p = router.route("p");
p.on("message:text", async(ctx)=>{
    ctx.session.qoshimcha = ctx.message.text;
    await ctx.reply(`Xodim kerak:

    👨‍💼 Idora: ${ctx.session.Idora}
    📚 Texnologiya: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: ${ctx.from.username} 
    📞 Aloqa: ${ctx.session.aloqa}
    🌐 Hudud: ${ctx.session.hudud} 
    ✍️ Mas'ul: ${ctx.session.fullname} 
    🕰 Murojaat vaqti: ${ctx.session.murojatvaqt}
    🕰 Ish vaqti: a ${ctx.session.ishvaqt}
    💰 Maosh: ${ctx.session.maosh} 
    ‼️ Qo\`shimcha: ${ctx.session.qoshimcha}

    #ishJoyi`
    );

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...yesNo
        }
    })
    ctx.session.step = "m";
   
});


const m = router.route("m");

m.hears(`Yoq`, async(ctx)=>{
    await ctx.reply(`Qabul qilinmadi`,{
        reply_markup:{
            ...menu
        }
    })
        
    ctx.session.step = "";    
});


m.hears("Ha", async(ctx)=>{
    console.log(ctx.message.text);
    await ctx.reply(`📪 So\`rovingiz tekshirish uchun adminga jo\`natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
    reply_markup:{
        ...menu
    }
    })
});


module.exports = router