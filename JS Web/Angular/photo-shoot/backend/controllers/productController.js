const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const {
  getImagePath,
  deleteImage,
  filterEmptyArr,
} = require("../services/globalService");

async function getProducts(req, res) {
  const query = req.query;
  const filterOptions = {};
  if (query.category) {
    filterOptions.categories = query.category;
  }
  const pageSize = Number(query.pagesize);
  const currentPage = Number(query.page);

  try {
    let products;
    if (pageSize && currentPage) {
      products = await Product.find(filterOptions)
        .sort({ date: -1 })
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .populate("categories")
        .lean();
    } else {
      products = await Product.find(filterOptions)
        .populate("categories")
        .lean();
    }
    console.log("products -> ", products);

    if (products) {
      const count = await Product.countDocuments(filterOptions);
      res.status(200).json({ message: "Photos fetched!", products, count });
    }
  } catch (err) {
    console.error("getProducts - Database error: ", err.message);
  }

  // try {
  //   const products = await Product.find().lean();
  //   // console.log('getProducts - 1: ', products);
  //   // const rootCategory = new ProductCategory({
  //   //   title: "rootCategory",
  //   //   description: "rootCategory",
  //   //   imgUrl: "",
  //   //   products: [],
  //   // });
  //   // const lenses = new ProductCategory({
  //   //   title: "lenses",
  //   //   description: "Test description for lenses",
  //   //   imgUrl: "https://images.unsplash.com/photo-1642783632165-e13d344adc1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  //   //   products: [],
  //   //   parentId: rootCategory._id
  //   // });
  //   // const dslrLenses = new ProductCategory({
  //   //   title: "dslrLenses",
  //   //   description: "Test description for DSLR lenses",
  //   //   imgUrl: "https://images.unsplash.com/photo-1642783632165-e13d344adc1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  //   //   products: [],
  //   //   parentId: lenses._id,
  //   // });

  //   // await rootCategory.save()
  //   // await lenses.save();
  //   // await dslrLenses.save();

  //   ProductCategory.findOne({title: 'rootCategory'}, function(err, rootCategory) {
  //     ProductCategory.rebuildTree(rootCategory, 1, function() {
  //       // at this point, the tree is built and every node has a lft and rgt value.
  //       rootCategory.children(function(err, people) {
  //         console.log(people);
  //       });
  //       console.log('Is rootCategory a leaf node?', rootCategory.isLeaf());
  //       console.log('Is rootCategory a child node?', rootCategory.isChild());
  //     });
  //   });

  //   res.status(200).json({ message: "Products fetched!", products });
  // } catch (err) {
  //   console.error("getProductS - Database error: ", err.message);
  //   res.status(500).json({ message: "Server error!" });
  // }
}

async function getProduct(req, res) {
  try {
    const product = await Product.findById({ _id: req.params.id })
      .populate({ 
        path: 'categories',
        populate: {
          path: 'products',
        } 
      })
      .lean();
    if (product) {
      res.status(200).json({ message: "Product fetched!", product });
    }
  } catch (err) {
    console.error("getProduct - Database error: ", err.message);
  }
}

async function createProduct(req, res) {
  try {
    const productCategories = await ProductCategory.find({
      _id: filterEmptyArr(req.body.categories),
    });

    console.log(req.body);
    const product = new Product({
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      imgUrl: getImagePath(req).image,
      price: Number(req.body.price),
      oldPrice: Number(req.body.oldPrice),
      categories: productCategories,
    });

    productCategories.forEach(async (category) => {
      category.products.push(product._id);
      await category.save();
    });

    await product.save();
    res.status(200).json({ message: "You create product successfully!", product });
} catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("createProduct err:" + err.message);
  }
}

async function deleteProduct(req, res) {
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

async function editProduct(req, res) {
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
    res.status(200).json({ message: "You edited product successfully!", product });

  } catch (err) {
    if (err.kind == "ObjectId") {
      throw new Error("Invalid data!");
    }
    throw new Error("editProduct err:" + err.message);
  }
}

module.exports = {
  getProduct,
  createProduct,
  getProducts,
  deleteProduct,
  editProduct,
};
