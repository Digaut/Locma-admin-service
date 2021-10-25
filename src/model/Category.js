const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    thumbnail: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
