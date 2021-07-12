const router = require("express").Router();

const { listUsers, registerUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// /photo-shoot/api/user
router.get("/", listUsers);
router.post("/register", registerUser);

module.exports = router;
