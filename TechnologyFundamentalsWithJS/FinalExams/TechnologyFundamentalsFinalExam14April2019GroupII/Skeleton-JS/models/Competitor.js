const mongoose = require('mongoose');

const competitorSchema = new mongoose.Schema({
    // TODO: Implement me
    name:{type:String,require:true},
    age:{type:Number,require:true},
    team:{type:String,require:true},
    category:{type:String,require:true}
});

const Competitor = mongoose.model('Competitor', competitorSchema);
module.exports = Competitor;