const userRoutes = require("../routes/userRoutes");
const photoRoutes = require("../routes/photoRoutes");

module.exports = (app) => {
  app.use("/photo-shoot/api/user", userRoutes);
  app.use("/photo-shoot/api/photo", photoRoutes);
  //  to do...
  const Category = require("../models/Category");
  app.get("/photo-shoot/api/categories", async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully!",
      categories,
    });
  });
};
