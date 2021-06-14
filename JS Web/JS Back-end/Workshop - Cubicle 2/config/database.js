const mongoose = require("mongoose");
module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://localhost:27017/cubicle`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            autoIndex: false
        });

        const db = mongoose.connection;

        db.on("error", (err) => {
            console.log(`Database error: ${err.message}`);
            reject(err.message);
        });

        db.on("open", (err) => {
            console.log(`Database connected`);
            resolve();
        });
    });
};
