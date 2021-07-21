const router = require("express").Router();

const { listUsers, registerUser, loginUser, editUser, myProfile } = require("../controllers/userController");
const { isGuest } = require("../middlewares/guardsMiddleware");

// /photo-shoot/api/user
router.get("/", listUsers);
router.post("/register", isGuest(), registerUser);
router.post("/login", isGuest(), loginUser);
router.post("/edit", editUser);
router.post("/myprofile", myProfile);


module.exports = router;
