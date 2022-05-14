const Product = require("../models/Product");

module.exports = () => (req, res, next) => {

  req.cart = {
    Cart
  }

  try {
    const cartFromHeaders = req.header('Cart') ? JSON.parse(req.header('Cart')) : undefined;
    if (cartFromHeaders !== undefined) {
      cartFromHeaders.items = JSON.parse(cartFromHeaders.items);
      cartFromHeaders.totalQty = Number(cartFromHeaders.totalQty);
      cartFromHeaders.totalPrice = Number(cartFromHeaders.totalPrice);
      let cart = new Cart(cartFromHeaders ? cartFromHeaders : {});
      req.cart = { Cart, cart };
      res.setHeader("Cart", req.cart);
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid cart data!" });
  }

  function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    // Add or remove products from cart, update quantity (- or +), calculate prices & total product quantity
    this.cartAdjustment = function (item, id, quantity = 1) {
      if (!this.items[id]) {
        this.items[id] = {
          item,
          qty: 0, 
          price: 0 
        };
      }
      if(quantity != 0){
        this.items[id].qty += quantity;
        this.items[id].price = this.items[id].item.price * this.items[id].qty;

         // Remove products with quantity <= 0 from cart
        this.items = Object.keys(this.items)
          .filter( key => this.items[key].qty > 0)
          .reduce( (res, key) => Object.assign(res, { [key]: this.items[key] }), {} );

        this.totalQty = Object.values(this.items).reduce((acc, item) => acc + item.qty, 0);
        this.totalPrice = Object.values(this.items).reduce((acc, item) => acc += item.qty * item.price, 0);;

        // Check for incorrect qty or price
        if(this.totalQty < 0 && this.totalPrice < 0){
          this.totalQty = 0;
          this.totalPrice = 0;
          this.items = {}
        }
      }

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




