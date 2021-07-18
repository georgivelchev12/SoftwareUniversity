const User = require("../models/User");
async function getUserByEmail(email) {
  return await User.findOne({
    email: { $regex: email, $options: "i" },
  });
}

module.exports = {
  getUserByEmail,
};
