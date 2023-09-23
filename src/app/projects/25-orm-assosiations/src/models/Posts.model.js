const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Post extends Model {};


Post.init(
{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "posts",
  }
);

module.exports = Post;
