const { addToCart } = require("../controllers/checkoutController");
const router = require("express").Router();

// /photo-shoot/api/checkout
router.post("/addToCart/:id", addToCart);


module.exports = router;
