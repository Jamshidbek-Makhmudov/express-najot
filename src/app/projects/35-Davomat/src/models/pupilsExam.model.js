const {model, Schema } = require("mongoose");

const schema = new Schema({
    ball:{
        type:String,
        default: 0,
    },
    mark:{
        type:Number,
        default: 0,
    }, 
    examName:{
        type:String,
    },
    photo:{
        type:String,
    },
    status:{
        type:Boolean,
    },

    pupils_id:{
        type:Schema.Types.ObjectId,
        ref: "pupils",
        required: true,
    },
    exam_id:{
        type:Schema.Types.ObjectId,
        ref:"exam",
        required:true,
    },
    text:{
        type:String,
    }

},
{
    timestamps: true

});

module.exports = model("pupilsExam", schema)