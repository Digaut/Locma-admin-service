const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settelmentAmountSchema = new Schema({
    field: {
        type: String,
        enum: ["category", "subcategory", "brand", "model", "modelNo"]
    },
    value: String,
    commissionCharge: Number
}, { timestamps: true });
settelmentAmountSchema.index({ field: 1, value: 1 }, { unique: true });
module.exports = mongoose.model("SettelmentAmount", settelmentAmountSchema);
