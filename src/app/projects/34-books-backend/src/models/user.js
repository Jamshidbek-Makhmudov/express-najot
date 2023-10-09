const {Model, DataTypes} = require('sequelize');
const sequelize = require("../database");

class User extends Model{}

User.init({
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    photo:{
        type:DataTypes.STRING(64)
    },
    firts_name:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    last_name:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(64),
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING(32),
        allowNull:true,
    },
    phone_number:{
        type:DataTypes.STRING(32),
        allowNull:true,
    },
    tavallud:{
        type:DataTypes.STRING(32),
    },
    manzil:{
        type:DataTypes.STRING(32),
    },
    bio:{
        type:DataTypes.STRING(64),
    },
    balance:{
        type:DataTypes.FLOAT(),
    }
}, 
{
    createdAt:"created_at",
    updatedAt:"update_at",
    tableName:"users",
    sequelize,
})

module.exports = User;
    