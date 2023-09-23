const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: "full_name",
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "users",
  }
);

module.exports = User;
