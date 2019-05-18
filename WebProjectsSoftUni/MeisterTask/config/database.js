const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = config => {
  mongoose.connect(config.dbPath, {
    useMongoClient: true
  });
  const db = mongoose.conntection;
  db.once('open', () => {
      console.log("Database ready!");
    });
    db.on('error', () => {
      console.log('Cannot connect to database!!!');
    });
};