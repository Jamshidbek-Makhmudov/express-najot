const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema); //shunda mongodb ni ozi table ni nomini koplikga ogirib create qilib beradi // Todos qilib
