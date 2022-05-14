const { Types } = require("mongoose");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const {
  getImagePath,
  deleteImage,
  filterEmptyArr,
} = require("../services/globalService");

async function getProductCategories(req, res) {
  const query = req.query;
  const filterOptions = {};
  if (query.categoryId) {
    filterOptions._id = query.categoryId
  }
  const pageSize = Number(query.pagesize);
  const currentPage = Number(query.page);

  try {
    ProductCategory.findOne({ title: "rootCategory", lft: 1 }, function (err, rootCategory) {
        ProductCategory.rebuildTree(rootCategory, 1, async function () {

          // Listing products of current category, including products of child categories (without duplication of products)
          let productsOfCurrentCategories = [];
          const currentCategory = await ProductCategory.findOne(filterOptions) || rootCategory
          
          if(!currentCategory.isRoot()){
            await currentCategory.children(async function (err, productIds) {

              currentCategory.products.forEach(id => {
                if(!productIds.includes(id)){
                  productIds.push(id)
                }
              })
  
              if (pageSize && currentPage) {
                productsOfCurrentCategories = await Product.find({ _id: { $in: productIds } })
                  .sort({ date: -1 })
                  .skip(pageSize * (currentPage - 1))
                  .limit(pageSize)
                  .lean();
              } else {
                productsOfCurrentCategories = await Product.find({ _id: { $in: productIds } });
              }
              
            }).distinct("products")
          } else {
            productsOfCurrentCategories = await Product.find();
          }

          currentCategory.children(function (err, childCategories) {
            const jsonObject = {
              message: "Categories fetched!",
              currentCategory,
              childCategories,
              productsOfCurrentCategories,
              count: productsOfCurrentCategories && productsOfCurrentCategories.length || 0
            };

            if(currentCategory.isRoot()){
              currentCategory.descendants(function(err, descendants){
                // console.log(descendants)
                jsonObject.descendants = descendants
                res.status(200).json(jsonObject);
              })
            } else {
              res.status(200).json(jsonObject);
            }

          });
        });
      }
    );
  } catch (err) {
    console.error("getProducts - Database error: ", err.message);
  }
}

async function getProductCategory(req, res) {
  try {
    const category = await ProductCategory.findById({ _id: req.params.id })
      .populate("products")
      .lean();
    if (category) {
      res.status(200).json({ message: "Product category fetched!", category });
    }
  } catch (err) {
    console.error("getProductCategory - Database error: ", err.message);
  }
}

async function createProductCategory(req, res) {
  try {
    const rootCategory = await ProductCategory.findOne({
      title: "rootCategory",
      lft: 1,
    });

    const productCategory = new ProductCategory({
      title: req.body.title,
      description: req.body.description,
      imgUrl: getImagePath(req).image,
      products: [],
      parentId: req.body.parentId || rootCategory._id,
    });

    await productCategory.save();
    res.status(200).json({ message: "You create category successfully!", productCategory });

  } catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("createCategory err:" + err.message);
  }
}

async function deleteProductCategory(req, res) {
  // To do ... delete category and handle all products in that category in proper way
  
  const foundProductCategory = await ProductCategory.findOne({ _id: req.params.id });
  try {
    
    foundProductCategory.parent(function (err, parentCategory){

      ProductCategory.updateOne(
        { _id: parentCategory._id },
        { $addToSet: { products: foundProductCategory.products } }
      ).then(data => {
        // console.log(data);
        Product.updateMany(
          { _id: { $in: foundProductCategory.products } },
          {
            $set: { categories: Types.ObjectId(parentCategory._id) }
          },
        ).then(d => {
          console.log('d>', d);
        });
      })
   
    })

    await Product.updateMany(
      {},
      {
        $pull: { categories: Types.ObjectId(req.params.id) }
      },
    );

    await deleteImage(getImagePath(req, foundProductCategory.imgUrl));
    await ProductCategory.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product category deleted!" });

  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

async function editProductCategory(req, res) {
  try {
    const rootCategory = await ProductCategory.findOne({
      title: "rootCategory",
      lft: 1,
    });

    const category = await ProductCategory.findById(req.body._id);
    const newCategoryData = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      imgUrl: getImagePath(req).image || category.imgUrl,
      parentId: req.body.parentId || rootCategory._id,
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
    throw new Error("editProductCategory err:" + err.message);
  }
}

module.exports = {
  getProductCategory,
  createProductCategory,
  getProductCategories,
  deleteProductCategory,
  editProductCategory,
};
