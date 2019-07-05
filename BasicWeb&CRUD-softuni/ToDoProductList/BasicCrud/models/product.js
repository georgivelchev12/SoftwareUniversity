const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: Number
})

const Product = mongoose.model('products',productSchema);

module.exports = Product;