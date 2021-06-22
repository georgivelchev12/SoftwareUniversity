const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/guards");

router.get("/register", isGuest(), (req, res) => {
    res.render("user/register");
});

router.post(
    "/register",
    isGuest(),
    body("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .bail()
        .isAlphanumeric()
        .withMessage("Username may contain only english letters and numbers"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 3 characters long")
        .bail()
        .isAlphanumeric()
        .withMessage("Password may contain only english letters and numbers"),
    body("rePass").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Password missmatch");
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                const message = errors.map((e) => e.msg).join("\n");
                // Improve
                throw new Error(message);
            }
            await req.auth.register(req.body.username.trim(), req.body.password.trim());
            res.redirect("/");
        } catch (err) {
            const ctx = {
                errors: err.message.split("\n"),
                userData: {
                    username: req.body.username,
                },
            };
            res.render("user/register", ctx);
        }
    }
);

router.get("/login", isGuest(), (req, res) => {
    res.render("user/login");
});

router.post("/login", isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.username.trim(), req.body.password.trim());
        res.redirect("/");
    } catch (err) {
        let errors = [err.message];
        if (err.type == "credential") {
            errors = ["Incorrect username or password"];
        }
        const ctx = {
            errors,
            userData: {
                username: req.body.username,
            },
        };
        res.render("user/login", ctx);
    }
});
router.get("/logout", (req, res) => {
    req.auth.logout();
    res.redirect("/");
});

module.exports = router;
