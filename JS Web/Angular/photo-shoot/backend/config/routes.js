const userRoutes = require("../routes/userRoutes");
const photoRoutes = require("../routes/photoRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const productRoutes = require("../routes/productRoutes");
const productCategoryRoutes = require("../routes/productCategoryRoutes");
const checkoutRoutes = require("../routes/checkoutRoutes");

module.exports = (app) => {
  app.use("/photo-shoot/api/user", userRoutes);
  app.use("/photo-shoot/api/photo", photoRoutes);
  app.use("/photo-shoot/api/categories", categoryRoutes);
  app.use("/photo-shoot/api/product", productRoutes);
  app.use("/photo-shoot/api/product-categories", productCategoryRoutes);
  app.use("/photo-shoot/api/checkout", checkoutRoutes);
};
