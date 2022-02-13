const mongoose = require("mongoose");
const globalVariables = new mongoose.Schema(
  {
    variableName: {
      required: true,
      type: String,
      unique: true,
    },
    value: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("GlobalVariables", globalVariables);
