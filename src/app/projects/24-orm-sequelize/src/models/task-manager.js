const { Model, DataTypes } = require("sequelize");
const sequelize=require('../database');

class TaskManager extends Model { }
TaskManager.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true,
	},
	title: {
		type: DataTypes.STRING(32),
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
		// field: 'des', // bu tableni dbga shu nom bilan save qiladi
	},
},
//options
	{
		createdAt:"created_at",
		updatedAt:"updated_at",
		modelName:"taskmanager",
		tableName: "taskmanager",
		freezeTableName: true,
		sequelize,
	}
);
module.exports = TaskManager;