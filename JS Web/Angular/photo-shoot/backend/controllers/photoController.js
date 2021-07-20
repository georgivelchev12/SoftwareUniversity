const Category = require("../models/Category");
const Photo = require("../models/Photo");
const { filterEmptyArr, getImagePath } = require("../services/globalService");

async function getPhotos(req, res) {
  try {
    const photos = await Photo.find().populate("author").lean();
    console.log("getPhotos:", photos);
    if (photos) {
      res.status(200).json({ message: "Photo fetched!", photos });
    }
  } catch (err) {
    console.error("getPhotos - Database error: ", err.message);
  }
}

async function getPhoto(req, res) {
  console.log(req.params.id);
  try {
    const photo = await Photo.findById({ _id: req.params.id }).populate("author").lean();
    console.log("getPhoto:", photo);
    if (photo) {
      res.status(200).json({ message: "Photo fetched!", photo });
    }
  } catch (err) {
    console.error("getPhoto - Database error: ", err.message);
  }
}

async function createPhoto(req, res) {
  
  
  try {
    const photoCategories = await Category.find({_id: filterEmptyArr(req.body.categories)});
  
    const photo = new Photo({
      title: req.body.title,
      descriptioWn: req.body.description,
      imgUrl: getImagePath(req),
      date: req.body.date,
      author: req.user._id,
      categories: photoCategories,
    });
  
    photoCategories.forEach(async (category) => {
      category.photos.push(photo._id)
      await category.save()
    })
    await photo.save();

  } catch (err) {
    if(err.kind == 'ObjectId'){
      throw new Error('Invalid data!')
    }
    throw new Error("createPhoto err:" + err.message)
  }

  res.status(200).json({ message: "You create photo successfully!" });
}
module.exports = {
  getPhoto,
  createPhoto,
  getPhotos,
};
