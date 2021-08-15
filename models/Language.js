const mongoose = require("mongoose");
const { Schema } = mongoose;

const languageSchema = new Schema(
  {
    language: String,
    family: String,
    description: String,
    iso693: String,
    region: String,
    status: String,
    words: [Array],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Language", languageSchema);
