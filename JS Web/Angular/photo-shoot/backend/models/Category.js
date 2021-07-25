const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: false },
  photos: [{ type: Schema.Types.ObjectId, ref: "Photo", default: [] }],
});

module.exports = model("Category", schema);
