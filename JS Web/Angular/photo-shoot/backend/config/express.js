const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const cartMiddleware = require("../middlewares/cartMiddleware");
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "HEAD, GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cart"
    );
    
    next();
  });

  // have BACKEND_IMAGE_FOLDER because local server path is different
  app.use("/photo-shoot/images", express.static(`${process.env.BACKEND_IMAGE_FOLDER || ""}images`));

  app.use(authMiddleware());
  app.use(cartMiddleware());
};
