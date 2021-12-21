const mongoose = require("mongoose");
module.exports = (app) => {
  mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => err ? console.log(`Failed to connect -> ${err}`) : console.log("Connected to database!")
  );
};
