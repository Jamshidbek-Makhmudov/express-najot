const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default:"Uzbekistan"
    },
    gender: {
      type: String,
      enum:["male", "female"],
    },
    salary: {
      type: Number,
      required: true,
      default:3000000,
    },
    job: {
      type: String,
      required: true,
      
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      default:"123",
    },
    balance: {
      type: Number,
      default: 30000,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
