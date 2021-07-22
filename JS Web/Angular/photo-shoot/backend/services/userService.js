const User = require("../models/User");
async function getUserByEmail(email) {
  return await User.findOne({
    email: { $regex: email, $options: "i" },
  });
}
async function getUserById(id) {
  return await User.findById(id);
}

module.exports = {
  getUserByEmail,
  getUserById,
};
