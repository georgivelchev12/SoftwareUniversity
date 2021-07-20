const { createPhoto } = require("../controllers/photoController");
const extractFile = require("../middlewares/fileMiddleware");
const { isUser } = require("../middlewares/guardsMiddleware");

const router = require("express").Router();

// /photo-shoot/api/photo
router.post("/", isUser(), extractFile, createPhoto);

module.exports = router;
