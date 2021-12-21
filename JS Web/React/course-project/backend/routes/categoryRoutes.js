const {
  createCategory,
  getCategories,
  getCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const extractFile = require("../middlewares/fileMiddleware");
const { isUser, isAdmin } = require("../middlewares/guardsMiddleware");

const router = require("express").Router();


// /photo-shoot/api/categories
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/edit", isAdmin(), extractFile, editCategory);
router.get("/delete/:id", isAdmin(), extractFile, deleteCategory);
router.post("/", isUser(), extractFile, createCategory);

module.exports = router;
