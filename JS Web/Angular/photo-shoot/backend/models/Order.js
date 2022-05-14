var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    town: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentId: { type: String, required: true },
    cart: { type: Object, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

module.exports = mongoose.model('Order', schema);