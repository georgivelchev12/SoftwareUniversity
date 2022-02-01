const Product = require("../models/Product");

module.exports = () => (req, res, next) => {

  try {
    const cartFromHeaders = req.header('Cart') ? JSON.parse(req.header('Cart')) : undefined;
    if (cartFromHeaders !== undefined) {
      let cart = new Cart(cartFromHeaders ? cartFromHeaders : {});
      req.cart = cart;
      res.setHeader("Cart", req.cart);
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid access token! Please login." });
    return;
  }

  function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.add = function (item, id) {
      var storedItem = this.items[id];
      console.log(storedItem, id);
      if (!storedItem) {
        storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
      }
      storedItem.qty++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      this.totalQty++;
      this.totalPrice += storedItem.item.price;
    };
    this.generateArray = function () {
      var arr = [];
      for (var id in this.items) {
        arr.push(this.items[id]);
      }
      return arr;
    };
  }
};




