const router = require("express").Router();

const {
  listUsers,
  registerUser,
  loginUser,
  editUser,
  myProfile,
  getUserProfile,
} = require("../controllers/userController");
const { isGuest, isUser, isAdmin } = require("../middlewares/guardsMiddleware");

const extractFile = require("../middlewares/fileMiddleware");

// /photo-shoot/api/user
router.get("/", listUsers);
router.post("/register", isGuest(), registerUser);
router.post("/login", isGuest(), loginUser);

router.put("/edit", isUser(), extractFile, editUser);
router.get("/myprofile", isUser(), myProfile);
router.get("/details/:id", getUserProfile);
router.get("/list", listUsers);

module.exports = router;
