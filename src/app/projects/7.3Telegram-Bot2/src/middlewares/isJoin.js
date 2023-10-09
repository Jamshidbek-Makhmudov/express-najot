const { InlineKeyboard, Bot } = require("grammy");

const isJoin = async(ctx, next)=>{
    const userId = ctx.from.id;
    const {status} =await ctx.api.getChatMember( "-1001755984707",userId );

    if(status !== "left"){
        return next();
    }
    console.log(data);

    const keyboard = new InlineKeyboard().url(
        "A'zo bo'lish",
        "https://t.me/safiyaMakhmudova"
    );

    await ctx.reply("Iltimos avval kanalga a'zo boling..", {
        reply_markup: {
            ...keyboard
        }
    });
};

module.exports = isJoin;