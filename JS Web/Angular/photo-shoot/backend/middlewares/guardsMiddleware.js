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
      next();
    } else {
      res.status(401).json({ message: "You already logged in!" });
    }
  };
}
function isOwner() {
  return async (req, res, next) => {
    const photo = await Photo.findOne({ _id: req.params.id || req.body._id }).populate('author');
    let photoId = photo ? photo.author._id : undefined; 
    let userId = req.user ? req.user._id : undefined; 
    if (photoId == userId) {
        next();
    } else {
      res.status(401).json({ message: "You are not the owner!" });
    }
  };
}
function isAdmin() {
  return (req, res, next) => {
    if (req.user.role == 'admin') {
      next();
    } else {
      res.status(401).json({ message: "You not have rights!" });
    }
  };
}


module.exports = {
  isGuest,
  isUser,
  isOwner,
  isAdmin
};

// To do... is owner, etc.
