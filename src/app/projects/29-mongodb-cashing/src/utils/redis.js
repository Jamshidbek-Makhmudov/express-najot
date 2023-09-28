const {createClient} = require("redis");
/**masofadagi redisga remote ulanmoqchi bolsak:
 * const client = createClient({url:'redis://192168169:8080...'}); qilib ulanib ishlatib ketsa boladi IP va port
 */
const client = createClient();

client.on("error", (err) => {
  console.log(err);
});

module.exports = client; //client yani redis vaqtinchalik cashe database cli yoqilgan xolatda turishi kerak
