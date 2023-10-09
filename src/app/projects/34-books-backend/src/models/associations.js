const Admin = require("./admin");
const User = require("./user");
const Book = require("./book");
const Author = require("./author");
const Comment = require("./comment");
const Reads = require("./reads");


User.hasMany(Comment, {foreignKey: "user_id"});
Comment.belongsTo(User, {foreignKey: "user_id"});

Book.hasMany(Comment, {foreignKey: "book_id"});
Comment.belongsTo(Book, {foreignKey:"book_id"});

User.hasMany(Reads,{foreignKey: "user_id"} );
Reads.belongsTo(User,{foreignKey:"user_id"});

Book.hasOne(Reads, {foreignKey:"book_id"});
Reads.belongsTo(Book, {foreignKey:"book_id"});

// User.hasMany(Like, {foreignKey: "user_id"});
// Like.belongsTo(User, {foreignKey: "user_id"});

// User.hasOne(Comment, {foreignKey: "user_id"})
// Comment.belongsTo(User, {foreignKey: "user_id"})

