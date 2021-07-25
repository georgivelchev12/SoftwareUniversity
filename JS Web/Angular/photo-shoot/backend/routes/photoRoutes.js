const { createPhoto, getPhoto, getPhotos, deletePhoto } = require("../controllers/photoController");
const extractFile = require("../middlewares/fileMiddleware");
const { isUser } = require("../middlewares/guardsMiddleware");

const router = require("express").Router();

// /photo-shoot/api/photo
router.post("/", isUser(), extractFile, createPhoto);
router.get("/list", getPhotos);
router.get("/delete/:id", deletePhoto);
router.get("/:id", getPhoto);



module.exports = router;
