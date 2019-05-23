// TODO: Create Contact model and export it

const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    name: {type: String, required: true},
    number: Number
})

const Contact = mongoose.model('contacts',phoneSchema);

module.exports = Contact;