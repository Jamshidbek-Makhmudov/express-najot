const {model, Schema } = require("mongoose");

const schema = new Schema({
    name:{
        type:String,
        required:true,
    },
    topshiriq:{
        type:String,
        required: true,
    },
    endTime:{
        type:Date,
        required: true,
    },
    group_id:{
        type:Schema.Types.ObjectId,
        ref: "group",
        rquired: true,
    }
},
{
    timestamps: true,
});

module.exports = model("exam", schema)