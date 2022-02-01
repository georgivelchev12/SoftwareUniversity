const { createProductCategory, getProductCategories, getProductCategory, deleteProductCategory, editProductCategory } = require("../controllers/productCategoryController");
const extractFile = require("../middlewares/fileMiddleware");
const { isAdmin } = require("../middlewares/guardsMiddleware");

const router = require("express").Router();

// /photo-shoot/api/product-categories
router.post("/", extractFile, createProductCategory);
router.put("/edit", extractFile, editProductCategory);
router.get("/delete/:id", isAdmin(), deleteProductCategory);
router.get("/list", getProductCategories);
router.get("/:id", getProductCategory);

module.exports = router;
