const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    rate: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
