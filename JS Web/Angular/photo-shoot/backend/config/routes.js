const userRoutes = require('../routes/userRoutes');

module.exports = (app) => {
    app.use("/photo-shoot/api/user", userRoutes);
    
};
