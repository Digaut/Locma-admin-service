const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    offerTitle: String,
    category: String,
    products: [{ _id: false, id: mongoose.Types.ObjectId, offerPrice: Number }],
}, { timestamps: true });

module.exports = mongoose.model("Offer", offerSchema);
