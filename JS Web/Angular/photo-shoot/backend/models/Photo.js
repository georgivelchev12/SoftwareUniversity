const { Schema, model } = require("mongoose");

const schema = new Schema({
    // To do .. add validation
  title: { type: String, required: false },
  description: { type: String, required: false },
  imgUrl: { type: String, required: false },
  date: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category", default: [] }],
});

module.exports = model("Photo", schema);
