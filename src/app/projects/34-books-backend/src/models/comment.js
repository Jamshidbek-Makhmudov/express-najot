const {Model, DataTypes} = require('sequelize');
const sequelize = require("../database");

class Comment extends Model{}

Comment.init({
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    text:{
        type:DataTypes.TEXT,
    },
    
}, 
{
    createdAt:"created_at",
    updatedAt:"update_at",
    tableName:"comments",
    sequelize,
})

module.exports = Comment;
    