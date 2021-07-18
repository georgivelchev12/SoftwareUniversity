const bcrypt = require("bcrypt");
const User = require("../models/User");
const { getUserByEmail } = require("../services/userService");

async function registerUser(req, res, next) {
  try {
    // const existing = await User.find({ email });
    // if (existing) {
    //   throw new Error("User with this email already exsists");
    // }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      hashedPassword,
    });
    await user.save();
    res.status(200).json({
      message: 'You have registered successfully!',
      ...req.auth.createToken(user)
    });
  } catch (err) {
    console.log("registerUser error:", err.message);
    res.status(403).json({ message: err.message });
  }
}

async function loginUser(req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (!user) {
    // to do res.json
    throw new Error("Wrong username or password");
  } else {
    const isMatch = await bcrypt.compare(req.body.password, user.hashedPassword);
    if (!isMatch) {
    // to do res.json
      throw new Error("Wrong username or password");
    } else {
      res.status(200).json({
        message: 'You logged in successfully!',
        ...req.auth.createToken(user)
      });
    }
  }
}
async function listUsers(req, res, next) {
  console.log(req.user);
  res.status(200).json({ message: "List Users" });
}

module.exports = {
  listUsers,
  registerUser,
  loginUser
};
