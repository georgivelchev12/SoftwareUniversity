const Category = require("../models/Category");
const Photo = require("../models/Photo");
const {
  filterEmptyArr,
  getImagePath,
  deleteImage,
} = require("../services/globalService");
const { getUserById } = require("../services/userService");

async function getPhotos(req, res) {
  const query = req.query;
  const filterOptions = {};
  if (query.myPhotos) {
    filterOptions.author = req.user._id;
  }
  if (query.userPhotos) {
    filterOptions.author = query.userPhotos;
  }
  if (query.category) {
    filterOptions.categories = query.category;
  }

  const pageSize = Number(query.pagesize);
  const currentPage = Number(query.page);

  try {
    let photos;
    if (pageSize && currentPage) {
      photos = await Photo.find(filterOptions)
        .sort({ date: -1 })
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .populate("author")
        .populate("categories")
        .lean();
    } else {
      photos = await Photo.find(filterOptions)
        .sort({ date: -1 })
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
  try {
    const photo = await Photo.findById({ _id: req.params.id })
      .populate("author")
      .populate("categories")
      .lean();
    photo.author.hashedPassword = null;
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
      description: req.body.description,
      imgUrl: getImagePath(req).image,
      date: req.body.date,
      author: req.user._id,
      categories: photoCategories,
    });

    photoCategories.forEach(async (category) => {
      category.photos.push(photo._id);
      await category.save();
    });
    const user = await getUserById(req.user._id);
    user.photos.push(photo);
    await user.save();
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
  res.status(200).json({ message: "Photo deleted!" });
  try {
    await deleteImage(getImagePath(req, foundPhoto.imgUrl));
    await Photo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Photo deleted!" });
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

async function editPhoto(req, res) {
  try {
    const photoCategories = await Category.find({
      _id: filterEmptyArr(req.body.categories),
    });
    const photo = await Photo.findById(req.body._id);
    const newPhotoData = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      imgUrl: getImagePath(req).image || photo.imgUrl,
      categories: photoCategories,
    };
    Object.assign(photo, newPhotoData);
    await photo.save();
    res.status(200).json({ message: "You edited photo successfully!", photo });
  } catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("editPhoto err:" + err.message);
  }
}

module.exports = {
  getPhoto,
  createPhoto,
  getPhotos,
  deletePhoto,
  editPhoto,
};
