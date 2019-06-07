const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  // TODO:
  name: { type: String, require: true },
  members: { type: String, require: true },
  honorarium: { type: Number, require: true },
  genre: { type: String, require: true }
});

const Band = mongoose.model('Band', bandSchema);
module.exports = Band;