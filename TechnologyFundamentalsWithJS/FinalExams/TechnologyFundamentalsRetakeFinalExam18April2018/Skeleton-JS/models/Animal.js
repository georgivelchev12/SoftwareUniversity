const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    //TODO: Implement me
    kind:{type:String, require: true},
    chipNumber:{type:Number, require: true},
    gender:{type:String, require: true}
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;