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
async function loginUser(req, res, next) {

  const user = await getUserByUsername(username);

  if (!user) {
      throw new Error("Wrong username or password");
  } else {
      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
          throw new Error("Wrong username or password");
      } else {
          req.user = createToken(user);
      }
  }


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
