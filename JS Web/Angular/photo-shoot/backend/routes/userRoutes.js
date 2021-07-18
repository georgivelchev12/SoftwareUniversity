const router = require("express").Router();

const { listUsers, registerUser, loginUser } = require("../controllers/userController");
const { isGuest } = require("../middlewares/guardsMiddleware");

// /photo-shoot/api/user
router.get("/", listUsers);
router.post("/register", isGuest(), registerUser);
router.post("/login", isGuest(), loginUser);


module.exports = router;
