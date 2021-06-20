const router = require("express").Router();
const { body, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
    res.render("register");
});
router.post(
    "/register",
    body("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
    body("rePass").custom((value, { req }) => {
        console.log(value, req.body.password);
        if (value != req.body.password) {
            throw new Error("Password missmatch");
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            console.log(errors);
            if (errors.length > 0) {
                // Improve
                throw new Error("Validation error");
            }
            await req.auth.register(req.body.username, req.body.password);
            res.redirect("/");
        } catch (err) {
            console.log(err.message);
            const ctx = {
                errors,
                userData: {
                    username: req.body.username,
                },
            };
            res.render("register", ctx);
        }
    }
);

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/')
    } catch (err) {
        console.log('in login: ', err.message);
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username,
            },
        };
        res.render("login", ctx);
    }
});

module.exports = router;
