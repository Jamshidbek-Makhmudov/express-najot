const { number } = require("joi");
const {model, Schema } = require("mongoose");

const schema = new Schema({
    number:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required: true,
    },
});

module.exports = model("group", schema)