const mongoose = require("mongoose");
const Post = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    postName: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
    },
    title: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    brand: {
      type: String,
    },
    clickAction: {
      type: String,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    key: {
      type: String,
    },
    query: {
      type: String,
    },
    label: {
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", Post);
