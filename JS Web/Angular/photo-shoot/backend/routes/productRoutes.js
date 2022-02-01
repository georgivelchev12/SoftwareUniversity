const { getProducts, getProduct, createProduct, deleteProduct, editProduct } = require("../controllers/productController");
const extractFile = require("../middlewares/fileMiddleware");
const { isAdmin } = require("../middlewares/guardsMiddleware");

const router = require("express").Router();

// /photo-shoot/api/product
router.post("/", extractFile, createProduct);
router.put("/edit", extractFile, editProduct);
router.get("/delete/:id", isAdmin(), deleteProduct);

router.get("/list", getProducts);
router.get("/:id", getProduct);



module.exports = router;
