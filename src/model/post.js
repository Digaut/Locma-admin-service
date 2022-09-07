const mongoose = require("mongoose");
const Post = new mongoose.Schema(
    {
        postName: {
            required: true,
            type: String,
            unique: true,
            lowercase: true,
        },

        image: {
            required: true,
            type: String,
        },

        clickAction: {
            type: String,
            required: true,
            uppercase: true,
        },
        category: {
            type: String,
        },
        subCategory: {
            type: String,
        },
        query: {
            type: String,
        },
        city: {
            type: String,
            required: true,
            lowercase: true,
        },
        postType: {
            type: String,
            required: true,
            lowercase: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Post", Post);
