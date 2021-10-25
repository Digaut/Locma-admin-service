const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema(
    {
        saleBanner: [{
            type: String,
        }],
        recomemdedProducts: [{ type: String }],
        active: {
            type: Boolean,
            default: false,
        },
        endDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('HomePage', homeSchema);
