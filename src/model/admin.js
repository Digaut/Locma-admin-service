const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: String,
    email: String,
    mobileNo: String,
    username: String,
    password: String,
    city: String,
    state: String,
    pincode: Number,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
