const mongoose = require("mongoose");
module.exports = (app) => {
  mongoose.connect(
    // `mongodb+srv://gVelchev:${process.env.MONGO_ATLAS_PW}@cluster0.k3dfj.azure.mongodb.net/KnowledgeBridge?retryWrites=true&w=majority`,
    process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => err ? console.log(`Failed to connect -> ${err}`) : console.log("Connected to database!")
  );
};
