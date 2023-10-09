const {Model, DataTypes} = require('sequelize');
const sequelize = require("../database");

class Admin extends Model{}

Admin.init({
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    email:{
        type:DataTypes.TEXT,
        unique:true,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING(64),
        allowNull:false,
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
    }
}, 
{
    createdAt:"created_at",
    updatedAt:"update_at",
    tableName:"admin",
    sequelize,
})

module.exports = Admin;
