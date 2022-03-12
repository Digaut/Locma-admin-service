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
      },
      closingTime: {
        type: String,
      },
      closingMessage: {
        type: String,
      },
    },
    acceptingOrders: {
      isAccepting: {
        type: Boolean,
      },
      message: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Settings", settings);
