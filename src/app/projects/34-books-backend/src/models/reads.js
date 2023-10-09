const {Model, DataTypes} = require('sequelize');
const sequelize = require("../database");

class Reads extends Model{}

Reads.init({
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    }
}, 
{
    createdAt:"created_at",
    updatedAt:"update_at",
    tableName:"reads",
    sequelize,
})

module.exports = Reads;
    