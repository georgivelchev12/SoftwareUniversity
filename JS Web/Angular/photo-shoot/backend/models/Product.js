var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imgUrl: { type: String, required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    categories: [{ type: Schema.Types.ObjectId, ref: "Product-Category", default: [] }],
});

module.exports = mongoose.model('Product', schema);