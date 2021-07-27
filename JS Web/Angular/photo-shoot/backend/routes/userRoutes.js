const router = require("express").Router();

const { listUsers, registerUser, loginUser, editUser, myProfile } = require("../controllers/userController");
const { isGuest } = require("../middlewares/guardsMiddleware");

const extractFile = require("../middlewares/fileMiddleware");


// /photo-shoot/api/user
router.get("/", listUsers);
router.post("/register", isGuest(), registerUser);
router.post("/login", isGuest(), loginUser);
router.put("/edit", extractFile, editUser);
router.get("/myprofile", myProfile);
router.get("/list", listUsers);


module.exports = router;
