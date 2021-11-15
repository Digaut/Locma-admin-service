const mongoose = require("mongoose");
const activeCities = mongoose.Schema({
  city: {
    type: String,
    unique: true,
  },
  status: {
    type: Boolean,
  },
  coOrdinate: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  description: {
    type: String,
  },
  pinCode: [
    {
      type: String,
      unique: true,
    },
  ],
});
module.exports = mongoose.model("ActiveCities", activeCities);
