const Like = require("./Likes.model");
const Post = require("./Posts.model");
const User = require("./Users.model");

User.hasMany(Post, {foreignKey: "user_id"});
Post.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Like, {foreignKey: "user_id"});
Like.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Like, {foreignKey: "post_id"});
Like.belongsTo(Post, { foreignKey: {name:"post_id", allowNull:false} }); //shunday qilib qoshimcha malumotlarni kiritib ketsa boladi
