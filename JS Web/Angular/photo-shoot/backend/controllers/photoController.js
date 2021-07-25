const Category = require("../models/Category");
const Photo = require("../models/Photo");
const fs = require("fs")
const { filterEmptyArr, getImagePath } = require("../services/globalService");

async function getPhotos(req, res) {
  const query = req.query;
  const filterOptions = {};
  if (query.myPhotos) {
    filterOptions.author = req.user._id;
  }

  const pageSize = Number(query.pagesize);
  const currentPage = Number(query.page);

  try {
    let photos;
    if (pageSize && currentPage) {
      photos = await Photo.find(filterOptions)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .populate("author")
        .populate("categories")
        .lean();
    } else {
      photos = await Photo.find(filterOptions)
        .populate("author")
        .populate("categories")
        .lean();
    }

    photos.forEach(({ author }) => {
      if (author) {
        author.hashedPassword = null;
      }
    });
    if (photos) {
      let count = await Photo.countDocuments(filterOptions);
      res.status(200).json({ message: "Photos fetched!", photos, count });
    }
  } catch (err) {
    console.error("getPhotos - Database error: ", err.message);
  }
}

async function getPhoto(req, res) {
  console.log(req.params.id);
  try {
    const photo = await Photo.findById({ _id: req.params.id })
      .populate("author")
      .lean();
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
    const photoCategories = await Category.find({
      _id: filterEmptyArr(req.body.categories),
    });

    const photo = new Photo({
      title: req.body.title,
      descriptioWn: req.body.description,
      imgUrl: getImagePath(req).image,
      date: req.body.date,
      author: req.user._id,
      categories: photoCategories,
    });

    photoCategories.forEach(async (category) => {
      category.photos.push(photo._id);
      await category.save();
    });
    await photo.save();
  } catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("createPhoto err:" + err.message);
  }

  res.status(200).json({ message: "You create photo successfully!" });
}

async function deletePhoto(req, res) {
  const foundPhoto = await Photo.findOne({ _id: req.params.id });

  console.log(foundPhoto, getImagePath(req, foundPhoto.imgUrl));
  res.status(200).json({ message: "Post deleted!" });

  try {
    await deleteImage(getImagePath(req, foundPhoto.imgUrl));
    await Photo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post deleted!" });
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

async function deleteImage(path) {
  if (fs.existsSync(path)) {
    await fs.promises.unlink(path);
  }
}

module.exports = {
  getPhoto,
  createPhoto,
  getPhotos,
  deletePhoto,
};
