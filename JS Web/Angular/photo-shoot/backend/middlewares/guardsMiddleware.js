const Photo = require("../models/Photo");

function isUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: "You are not authenticated" });
    }
  };
}
function isGuest() {
  return (req, res, next) => {
    if (req.user == undefined) {
      // console.log("in guard", req.user);
      next();
    } else {
      res.status(401).json({ message: "You already logged in!" });
    }
  };
}
function isOwner() {
  return async (req, res, next) => {
    const photo = await Photo.findOne({ _id: req.params.id }).populate('author');
    if (photo?.author._id == req.user?._id) {
        next();
    } else {
      res.status(401).json({ message: "You are not the owner!" });
    }
};
}
 

module.exports = {
  isGuest,
  isUser,
  isOwner
};

// To do... is owner, etc.
