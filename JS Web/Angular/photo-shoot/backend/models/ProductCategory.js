const { Schema, model } = require("mongoose");
const NestedSetPlugin = require("../services/nested_set.js");

const schema = new Schema({
    // To do .. add validation
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: false },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
});

// Include plugin
schema.plugin(NestedSetPlugin);

module.exports = model("Product-Category", schema);
