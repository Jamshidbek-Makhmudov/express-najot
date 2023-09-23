const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Like extends Model {};

Like.init(
	{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
}, {
	createdAt: "created_at",
	updatedAt: "updated_at",
	sequelize,
	tableName: "like"
});
module.exports = Like;