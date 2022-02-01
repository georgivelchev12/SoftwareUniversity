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
          let productsOfCurrentCategories = await Product.find();;
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
          }

          currentCategory.children(function (err, childCategories) {
            const jsonObject = {
              message: "Categories fetched!",
              currentCategory,
              childCategories,
              productsOfCurrentCategories,
              count: productsOfCurrentCategories?.length || 0
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
    const product = await ProductCategory.findById({ _id: req.params.id })
      .populate("products")
      .lean();
    if (product) {
      res.status(200).json({ message: "Product category fetched!", product });
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

    console.log(productCategory);
    
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
  
  const foundProduct = await Product.findOne({ _id: req.params.id });
  res.status(200).json({ message: "Product deleted!" });
  try {
    await deleteImage(getImagePath(req, foundProduct.imgUrl));
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted!" });
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

async function editProductCategory(req, res) {
  try {
    const productCategories = await ProductCategory.find({
      _id: filterEmptyArr(req.body.categories),
    });

    const product = await Product.findById(req.body._id);
    const newProductData = {
      _id: req.body._id,
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      imgUrl: getImagePath(req).image || product.imgUrl,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      categories: productCategories,
    };
    Object.assign(product, newProductData);
    await product.save();
    res
      .status(200)
      .json({ message: "You edited product successfully!", product });
  } catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("editProduct err:" + err.message);
  }
}

module.exports = {
  getProductCategory,
  createProductCategory,
  getProductCategories,
  deleteProductCategory,
  editProductCategory,
};
