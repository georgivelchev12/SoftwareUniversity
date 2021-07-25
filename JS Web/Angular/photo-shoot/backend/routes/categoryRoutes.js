const {
  createCategory,
  getCategories,
  getCategory,
} = require("../controllers/categoryController");
const extractFile = require("../middlewares/fileMiddleware");
const { isUser } = require("../middlewares/guardsMiddleware");

const router = require("express").Router();


// /photo-shoot/api/categories
router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", isUser(), extractFile, createCategory);

module.exports = router;
