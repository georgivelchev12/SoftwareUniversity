const userRoutes = require('../routes/userRoutes');
const photoRoutes = require('../routes/photoRoutes');

module.exports = (app) => {
    app.use("/photo-shoot/api/user", userRoutes);
    app.use("/photo-shoot/api/photo", photoRoutes);
};
