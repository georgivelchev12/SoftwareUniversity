const Order = require("../models/Order");
const Product = require("../models/Product");
const {
  getImagePath,
  deleteImage,
} = require("../services/globalService");

async function addToCart(req, res) {
  let productId = req.params.id;
  let cart = new req.cart.Cart(req.cart.cart ? req.cart.cart : {});
  try {

    const product = await Product.findById(productId);
    product.shortDescription = '';
    product.description = '';

    cart.cartAdjustment(product, product.id, req.body.quantity);
    req.cart = {
      ...req.cart,
      cart
    };
    console.log(cart);
    res.status(200).json({ message: "Product added successfully!", cart: req.cart.cart });

  } catch (err) {
    res.status(500).json({ message: "Product can't be added to cart!" });
    return;
  }
}

async function createOrder(req, res){
  // To do.. validation

  if(req.cart.cart == undefined){
    res.status(500).json({ message: "No products added to cart!", redirect: "/products" });
    return;
  }

  req.cart.cart.totalPrice += 6;

  const order = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    country: req.body.country,
    town: req.body.town,
    address: req.body.address,
    paymentMethod: req.body.paymentMethod,
    paymentId: 'to do ... charge.id from stripe',
    cart: req.cart.cart,
  });

  if(req.user){
    order.user = req.user;
    // to do ... add current order to current user orders (get it by req.user._id)
  }

  console.log(order);
  await order.save();
  res.status(200).json({ message: "Order created successfully!", order });
}

async function getOrder(req, res) {
  try {
    const order = await Order.findById({ _id: req.params.id })
    res.status(200).json({ message: "Order fetched!", order });
  } catch (err) {
    console.error("getOrder - Database error: ", err.message);
  }
}

async function getOrders(req, res) {
  const query = req.query;
  const filterOptions = {};
  if (query.myOrders){
    filterOptions.user = req.user._id
  }
  try {
    const orders = await Order.find(filterOptions);
    res.status(200).json({ message: "Orders fetched!", orders });
  } catch (err) {
    console.error("getOrders - Database error: ", err.message);
  }
}

module.exports = {
  addToCart,
  createOrder,
  getOrder,
  getOrders
};
