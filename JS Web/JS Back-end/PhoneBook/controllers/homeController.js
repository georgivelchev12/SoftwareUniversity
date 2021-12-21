const router = require("express").Router();

router.get("/", (req, res) => res.redirect("/phones"));

router.all("*", (req, res) => {
    res.render("404");
});

module.exports = router;
