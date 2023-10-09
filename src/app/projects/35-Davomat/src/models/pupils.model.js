const {model, Schema } = require("mongoose");

const schema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required: true
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    group_id:{
        type:Schema.Types.ObjectId,
        ref: "group",
        rquired: true,
    }
});

module.exports = model("pupils", schema)