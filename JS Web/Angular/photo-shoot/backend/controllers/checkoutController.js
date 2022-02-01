const Product = require("../models/Product");
const {
  getImagePath,
  deleteImage,
} = require("../services/globalService");

async function addToCart(req, res) {
  console.log('in addtocart', req.cart);
  var productId = req.params.id;
  var cart = new req.cart.Cart(req.cart ? req.cart : {});
  Product.findById(productId, function(err, product) {
      if (err) {
          return res.redirect('/');
      }
      cart.add(product, product.id);
      req.cart = cart;
      console.log(req.cart);
      res.redirect('/');
  });

}
module.exports = {
  addToCart
};
