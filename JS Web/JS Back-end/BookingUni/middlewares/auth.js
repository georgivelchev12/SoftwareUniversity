const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, COOKIE_NAME } = require("../config");
const { getUserByUsername, createUser } = require("../services/user");

module.exports = (req, res, next) => {
    req.auth = {
        async register(username, password) {
            const token = await register(username, password);
            res.cookie(COOKIE_NAME, token);
        },
        async login(username, password) {
            const token = await login(username, password);
            res.cookie(COOKIE_NAME, token);
        },
        logout() {
            res.clearCookie(COOKIE_NAME);
        },
    };
    next();
};

async function register(username, password) {
    // TODO adapt parameters to project requirements
    // TODO extra validations

    const existing = await getUserByUsername(username);

    if (existing) {
        throw new Error("Username is taken!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    return generateToken(user);
}

async function login(username, password) {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error("No such user");
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error("Incorrect passwowrd");
    }

    return generateToken(user);
}

function generateToken(userData) {
    return jwt.sign(
        {
            _id: userData._id,
            username: userData.username,
        },
        TOKEN_SECRET
    );
}
