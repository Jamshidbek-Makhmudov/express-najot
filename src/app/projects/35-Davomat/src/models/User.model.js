const {model, Schema } = require("mongoose");

const schema = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true
    },
    is_user:{
        type:Boolean,
        default:false,
    }
});

module.exports = model("User", schema)