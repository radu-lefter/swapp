const mongoose = require("mongoose");
const { Schema } = mongoose;

const languageSchema = new Schema(
  {
    language: {type:String, required: [true, 'Name is required']},
    family: String,
    description: String,
    iso693: String,
    region: String,
    status: String,
    speakers: Number,
    words: {type:Object},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Language", languageSchema);
