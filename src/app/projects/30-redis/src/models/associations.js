const Post = require("./Post.Model");
const User = require("./User.model");

User.hasMany(Post, {foreignKey: "user_id"});
Post.belongsTo(User, {foreignKey: "user_id"});
