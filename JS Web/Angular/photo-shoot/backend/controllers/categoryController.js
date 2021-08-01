const Category = require("../models/Category");
const Photo = require("../models/Photo");
const { filterEmptyArr, getImagePath, deleteImage } = require("../services/globalService");

async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully!",
      categories,
    });
  } catch (err) {
    console.error("getCategories - Database error: ", err.message);
  }
}

async function getCategory(req, res) {
  try {
    const category = await Category.findById({ _id: req.params.id })
      .populate("photos")
      .lean();
    // console.log("getCategory:", category);
    if (category) {
      res.status(200).json({ message: "Category fetched!", category });
    }
  } catch (err) {
    console.error("getCategory - Database error: ", err.message);
  }
}

async function createCategory(req, res) {
  try {
    const category = new Category({
      title: req.body.title,
      description: req.body.description,
      imgUrl: getImagePath(req).image,
      photos: [],
    });
    await category.save();
    res
      .status(200)
      .json({ message: "You create category successfully!", category });
  } catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("createCategory err:" + err.message);
  }
}

async function editCategory(req, res) {
  try {
    const category = await Category.findById(req.body._id);
    const newCategoryData = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      imgUrl: getImagePath(req).image || category.imgUrl,
    };
    Object.assign(category, newCategoryData);
    await category.save();
    res
      .status(200)
      .json({ message: "You edited category successfully!", category });
  } catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("createCategory err:" + err.message);
  }
}

async function deleteCategory(req, res) {
  const foundCategory = await Category.findOne({ _id: req.params.id });
  res.status(200).json({ message: "Category deleted!" });
  try {
    await deleteImage(getImagePath(req, foundCategory.imgUrl));
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Category deleted!" });
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}
module.exports = {
  getCategory,
  createCategory,
  getCategories,
  editCategory,
  deleteCategory,
};
