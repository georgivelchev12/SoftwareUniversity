const userRoutes = require("../routes/userRoutes");
const photoRoutes = require("../routes/photoRoutes");
const categoryRoutes = require("../routes/categoryRoutes");

module.exports = (app) => {
  app.use("/photo-shoot/api/user", userRoutes);
  app.use("/photo-shoot/api/photo", photoRoutes);
  app.use("/photo-shoot/api/categories", categoryRoutes);
};
