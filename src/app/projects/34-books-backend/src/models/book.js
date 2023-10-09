const {Model, DataTypes} = require('sequelize');
const sequelize = require("../database");

class Book extends Model{}

Book.init({
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    pages:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    year:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    author:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    photo:{
        type:DataTypes.STRING(64),
        allowNull:false,
    },
}, 
{
    createdAt:"created_at",
    updatedAt:"update_at",
    tableName:"books",
    sequelize,
})

module.exports = Book;
    