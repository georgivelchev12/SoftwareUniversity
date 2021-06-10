const bcrypt = require("bcrypt");

const users = {};
module.exports = (req, res, next) => {
    req.register = async (username, password) => {
        const id = (
            "0000000" + ((Math.random() * 99999999) | 0).toString(16)
        ).slice(-8);

        const hashedPassword = await bcrypt.hash(password, 8);
        users[id] = {
            username: req.body.username,
            hashedPassword,
        };
        console.log("New user", users);

        res.redirect("/login");
    };

    req.login = async (username, password) => {
        const user = Object.entries(users).find(([id, u]) => {
            return u.username == username;
        });

        const passwordsMatch = await bcrypt.compare(
            req.body.password,
            user[1].hashedPassword
        );

        if (user && passwordsMatch) {
            req.session.user = {
                _id: user[1].id,
                username,
            };
            return true;
        } else {
            return false;
        }
    };

    next();
};
