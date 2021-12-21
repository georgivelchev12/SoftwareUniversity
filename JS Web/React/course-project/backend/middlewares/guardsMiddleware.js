const Photo = require("../models/Photo");
const { deleteImage, getImagePath } = require("../services/globalService");

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
      // Delete created image in case user is not owner of photo
      let imgUrlTodelete = `/photo-shoot/${req.files.image[0].destination.split('backend/')[1]}/${req.files.image[0].filename}`
      await deleteImage(getImagePath(req, imgUrlTodelete));
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
