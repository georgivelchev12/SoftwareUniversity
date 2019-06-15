const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  // TODO:
  name:{type:String, require: true},
  dlc:{type:String, require: true},
  price:{type:Number, require: true},
  platform:{type:String, require: true},
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;