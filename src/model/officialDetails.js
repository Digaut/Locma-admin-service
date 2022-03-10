const mongoose = require("mongoose");
const officialDetails = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    bankDetails: [
      {
        accountNo: {
          type: String,
          required: true,
          unique: true,
        },
        IFSC: {
          type: String,
          required: true,
        },
        bankName: {
          type: String,
          required: true,
        },

        accountHolderName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("OfficialDetails", officialDetails);
