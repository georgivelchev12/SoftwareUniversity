const router = require("express").Router();

const { listUsers, registerUser } = require("../controllers/userController");
const { isGuest } = require("../middlewares/guardsMiddleware");

// /photo-shoot/api/user
router.get("/", listUsers);
router.post("/register", isGuest(), registerUser);

module.exports = router;
