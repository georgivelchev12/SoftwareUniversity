const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isGuest, isUser } = require("../middlewares/guards");
const { getUserById } = require("../services/user");

router.get("/register", isGuest(), (req, res) => {
    res.render("user/register");
});

router.post(
    "/register",
    isGuest(),
    body("email").isEmail().withMessage("Not valid email"),
    body("password")
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters long"),
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
            await req.auth.register(
                req.body.email.trim(),
                req.body.password.trim(),
                req.body.gender.trim()
            );
            res.redirect("/");
        } catch (err) {
            const ctx = {
                errors: err.message.split("\n"),
                userData: {
                    email: req.body.email,
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
        await req.auth.login(req.body.email.trim(), req.body.password.trim());
        res.redirect("/");
    } catch (err) {
        let errors = [err.message];
        if (err.type == "credential") {
            errors = ["Incorrect email or password"];
        }
        const ctx = {
            errors,
            userData: {
                email: req.body.email,
            },
        };
        res.render("user/login", ctx);
    }
});
router.get("/logout", (req, res) => {
    req.auth.logout();
    res.redirect("/");
});

router.get("/profile", isUser(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);

        if (user._id != req.user._id) {
            throw new Error("Profile error");
        }
        const userData = {
            email: user.email,
            gender: user.gender,
            tripsHistory: user.tripsHistory,
            tripsCount: user.tripsHistory.length
        };
        res.render("user/profile", { userData });
    } catch (err) {
        console.log(err.message);
        res.redirect("/");
    }
});

module.exports = router;
