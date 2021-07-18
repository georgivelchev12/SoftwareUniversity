const extractFile = require("../middlewares/fileMiddleware");

const router = require("express").Router();


// /photo-shoot/api/photo
router.get("/", extractFile, (req, res, next) => {

});


module.exports = router;
