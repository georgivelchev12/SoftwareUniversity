const bcrypt = require("bcrypt");
const Photo = require("../models/Photo");
const User = require("../models/User");
const { getImagePath, filterEmptyArr, deleteImage } = require("../services/globalService");
const { getUserByEmail, getUserById } = require("../services/userService");

// Auth user / Start
async function registerUser(req, res) {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      throw new Error("User with this email already exsists");
    }
    if (req.body.password != req.body.rePassword) {
      throw new Error("Passwords missmatch!");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      hashedPassword,
    });

    console.log(req.body, user);

    if (
      req.body.email == "admin@admin.com" ||
      req.body.email == "g.velchev12@gmail.com"
    ) {
      user.role = "admin";
    }
    await user.save();
    res.status(200).json({
      message: "You have registered successfully!",
      ...req.auth.createToken(user),
    });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
      throw new Error("User with this email not exist");
    } else {
      const isMatch = await bcrypt.compare(
        req.body.password,
        user.hashedPassword
      );
      if (user.isDisabled) {
        throw new Error("You are currently banned and cant login in site");
      }
      if (!isMatch) {
        throw new Error("Wrong username or password");
      } else {
        res.status(200).json({
          message: "You logged in successfully!",
          ...req.auth.createToken(user),
        });
      }
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
// Auth user / End


// Edit user (edit, delete, restore, disable) / Start 
async function editUser(req, res) {
  const query = req.query;
  function isAdmin(actionFunction){
    if (req.user.role == 'admin') {
      const queryKey = Object.keys(query)[0]; // disable, restore, delete
      actionFunction(req, res, query[queryKey])
    } else {
      res.status(401).json({ message: "You have not rights for this action!" });
    }
  }
  if (query.disable) {
    isAdmin(disableUser)
  } else if (query.restore) {
    isAdmin(restoreUser)
  } else if (query.delete) {
    deleteUser(req, res, query.delete)
  } else {
    const user = await getUserById(req.user._id);
    const userImages = getImagePath(req);

    console.log(req.body, userImages);

    // console.log(userImages, {
    //   coverImgUrl: user.coverImgUrl, imgUrl: user.imgUrl
    // })
    // console.log(user.imgUrl)
    // console.log(user.coverImgUrl || userImages.coverImage)

    // To do .. check how to delete old images - if found user image is != '' and there is uploaded file then delete found user imgurl
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
}

async function deleteUser(req, res, queryId = "") {

  if (req.params.id == req.user._id || queryId == req.user._id) {
    deleteAction("You deleted your account successfully");
  } else {
    if (req.user.role != "admin") {
      res.status(401).json({
        message: "You are not authenticated to delete users profiles!",
      });
      return;
    }
    deleteAction("User deleted!");
  }

  async function deleteAction(message) {
    try {
      const user = await getUserById(req.params.id || queryId);
      if (user.role == "admin" && req.user._id != queryId) {
        throw new Error("You can't delete an admin account!");
      }

      await deleteImage(getImagePath(req, user.imgUrl));
      await deleteImage(getImagePath(req, user.coverImgUrl));

      await User.deleteOne({ _id: req.params.id || queryId});
      [...(await Photo.find({ author: req.params.id || queryId }))].forEach(async (p) => {
        await deleteImage(getImagePath(req, p.imgUrl));
      });
      await Photo.deleteMany({ author: req.params.id || queryId });
      res.status(200).json({ message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

async function disableUser(req, res, queryId = "") {
  if (req.user.role != "admin") {
    res.status(401).json({
      message: "You are not authenticated to disable users profiles!",
    });
    return;
  }

  User.findOne({ _id: req.params.id || queryId }).then((foundUser) => {
    if (foundUser.role == "admin") {
      res.status(409).json({ message: "You can't disable an admin account!" });
      return;
    }

    if (foundUser.isDisabled) {
      res.status(409).json({ message: "This user is already disabled!" });
      return;
    }

    foundUser.isDisabled = true;

    User.updateOne({ _id: req.params.id || queryId }, foundUser).then(
      (result) => {
        res.status(200).json({ message: "You disabled user successfully!" });
      }
    );
  });
}

async function restoreUser(req, res, queryId = '') {
  if (req.user.role != "admin") {
    res.status(401).json({
      message: "You are not authenticated to restore users profiles!",
    });
    return;
  }

  User.findOne({ _id: req.params.id || queryId }).then((foundUser) => {
    foundUser.isDisabled = false;
    User.updateOne({ _id: req.params.id || queryId }, foundUser).then((result) => {
      res.status(200).json({ message: "You restored user successfully!" });
    });
  });
}
// Edit user (edit, delete, restore, disable) / End 


async function myProfile(req, res) {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      user.hashedPassword = null;
      res.status(200).json({ message: "User fetched!", user });
    }
  } catch (err) {
    console.log("myProfile error: ", err.message);
  }
}

async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("photos").lean();
    user.hashedPassword = null;
    res.status(200).json({ message: "User fetched!", user });
  } catch (err) {
    console.log("myProfile error: ", err.message);
  }
}

async function listUsers(req, res) {
  try {
    const users = await User.find().populate("photos");
    users.map((u) => {
      u.hashedPassword = null;
    });
    res.status(200).json({ message: "List Users", users });
  } catch (err) {
    console.log("listUsers error: ", err.message);
  }
}


module.exports = {
  listUsers,
  registerUser,
  editUser,
  loginUser,
  myProfile,
  deleteUser,
  disableUser,
  restoreUser,
  getUserProfile,
};
