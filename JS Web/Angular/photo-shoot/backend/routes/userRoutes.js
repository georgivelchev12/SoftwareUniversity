const router = require("express").Router();

const {
  listUsers,
  registerUser,
  loginUser,
  editUser,
  myProfile,
  deleteUser,
  getUserProfile,
  disableUser,
  restoreUser
} = require("../controllers/userController");
const { isGuest, isUser, isAdmin } = require("../middlewares/guardsMiddleware");

const extractFile = require("../middlewares/fileMiddleware");

// /photo-shoot/api/user
router.get("/", listUsers);
router.post("/register", isGuest(), registerUser);
router.post("/login", isGuest(), loginUser);
router.get("/myprofile", isUser(), myProfile);
router.get("/details/:id", getUserProfile);
router.get("/list", listUsers);
router.put("/edit", isUser(), extractFile, editUser);

router.delete("/delete/:id", deleteUser);
router.put("/disable/:id", isAdmin(), disableUser);
router.put("/restore/:id", isAdmin(), restoreUser);

module.exports = router;
