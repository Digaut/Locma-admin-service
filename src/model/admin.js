const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: String,
    email: String,
    mobileNo: String,
    username: {
        type: String,
        default: this.email,
    },
    password: String,
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
