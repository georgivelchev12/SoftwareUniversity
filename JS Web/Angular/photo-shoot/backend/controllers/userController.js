const bcrypt = require("bcrypt");
const User = require("../models/User");

async function registerUser(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    hashedPassword,
  });

  await user.save();
  req.auth.createToken(user);
}
async function listUsers(req, res, next) {
  console.log(req.user);
  res.status(200).json({ message: "List Users" });
}

module.exports = {
  listUsers,
  registerUser,
};
