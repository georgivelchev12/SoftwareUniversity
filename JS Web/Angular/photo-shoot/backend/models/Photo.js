const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
  date: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Photo", schema);
