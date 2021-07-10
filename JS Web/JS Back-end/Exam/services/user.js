const User = require("../models/User");

async function createUser(email, hashedPassword, gender) {
    const user = new User({
        email,
        hashedPassword,
        gender
    });
    await user.save();
    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, "i");
    return await User.findOne({
        email: { $regex: pattern },
    });
}
async function getUserById(id) {
    return await User.findById(id).populate('tripsHistory').lean();
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
};
