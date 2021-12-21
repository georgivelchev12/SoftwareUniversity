const { Schema, model } = require("mongoose");

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  },
});

module.exports = model("Phone", schema);
