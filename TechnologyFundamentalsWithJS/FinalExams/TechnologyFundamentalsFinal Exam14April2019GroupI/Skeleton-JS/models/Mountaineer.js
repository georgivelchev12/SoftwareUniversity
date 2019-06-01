const mongoose = require('mongoose');

const mountaineerSchema = mongoose.Schema({
   name: { type: String, require: true },
   age: { type: Number, require: true },
   lastSeenDate: { type: String, require: true }
});

const Mountaineer = mongoose.model('Mountaineer', mountaineerSchema);
module.exports = Mountaineer;