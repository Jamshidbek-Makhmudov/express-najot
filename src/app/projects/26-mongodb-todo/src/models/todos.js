const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "success", "fail"],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Todo", schema); //shunda mongodb ni ozi table ni nomini koplikga ogirib create qilib beradi // Todos qilib
