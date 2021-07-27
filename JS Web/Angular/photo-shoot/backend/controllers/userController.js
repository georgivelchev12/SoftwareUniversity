const bcrypt = require("bcrypt");
const Photo = require("../models/Photo");
const User = require("../models/User");
const { getImagePath, filterEmptyArr } = require("../services/globalService");
const { getUserByEmail, getUserById } = require("../services/userService");

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
      message: "You have registered successfully!",
      ...req.auth.createToken(user),
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
    const isMatch = await bcrypt.compare(
      req.body.password,
      user.hashedPassword
    );
    if (!isMatch) {
      // to do res.json
      throw new Error("Wrong username or password");
    } else {
      res.status(200).json({
        message: "You logged in successfully!",
        ...req.auth.createToken(user),
      });
    }
  }
}

async function editUser(req, res) {
  const user = await getUserById(req.user._id);


  const userImages = getImagePath(req); 
  const newUserData = {
    hashedPassword: user.hashedPassword,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    info: req.body.info,
    phone: req.body.phone,
    imgUrl: userImages.image || user.imgUrl,
    coverImgUrl: userImages.coverImage || user.coverImgUrl,
    photos: filterEmptyArr(user.photos),
  };
  Object.assign(user, newUserData);
  await user.save();
  res.status(200).json({ message: "Edit success!", user });
}
async function myProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.hashedPassword = null;
    res.status(200).json({ message: "User fetched!", user });
  } catch (err) {
    console.log(err.message);
  }
}

async function listUsers(req, res, next) {
  try {
    const users = await User.find().populate('photos');
    users.map(u => {
      u.hashedPassword = null;
    })
    res.status(200).json({ message: "List Users",  users});
  } catch (err) {
    console.log('listUsers error: ', err.message);
  }
}

module.exports = {
  listUsers,
  registerUser,
  editUser,
  loginUser,
  myProfile,
};
