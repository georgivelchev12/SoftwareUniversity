const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  firstName: { type: String, required: false, default: "" },
  lastName: { type: String, required: false, default: "" },
  info: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  imgUrl: { type: String, required: false, default: "" },
  photos: [{ type: Schema.Types.ObjectId, ref: "Photo", default: [] }],
});

module.exports = model("User", schema);
