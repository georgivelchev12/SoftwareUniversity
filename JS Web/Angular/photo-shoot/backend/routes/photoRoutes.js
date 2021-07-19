const { createPhoto } = require("../controllers/photoController");
const extractFile = require("../middlewares/fileMiddleware");

const router = require("express").Router();


// /photo-shoot/api/photo
router.post("/", extractFile, createPhoto);



module.exports = router;
