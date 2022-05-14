const { addToCart, createOrder, getOrder, getOrders } = require("../controllers/checkoutController");
const { isAdmin } = require("../middlewares/guardsMiddleware");
const router = require("express").Router();

// /photo-shoot/api/checkout
router.post("/addToCart/:id", addToCart);
router.post("/createOrder", createOrder);
router.get("/order/:id", getOrder);
router.get("/orders", isAdmin(), getOrders);

module.exports = router;