const mongoose = require("mongoose");
const settings = new mongoose.Schema(
  {
    city: {
      unique: true,
      type: String,
      required: true,
    },
    deliveryTiming: {
      openingTime: {
        type: String,
        required: true,
      },
      closingTime: {
        type: String,
        required: true,
      },
      closingMessage: {
        type: String,
        required: true,
      },
    },
    acceptingOrders: {
      isAccepting: {
        type: Boolean,
        required: true,
        default: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Settings", settings);
