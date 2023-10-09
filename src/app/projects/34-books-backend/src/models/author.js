const {Model, DataTypes} = require('sequelize');
const sequelize = require("../database");

class Author extends Model{}

Author.init({
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    firts_name:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    last_name:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    birth_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    death_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    bio:{
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
    tableName:"authors",
    sequelize,
})

module.exports = Author;
    