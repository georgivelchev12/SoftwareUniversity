const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

  // To do.. check images folder 
  // app.use("/courses-project/images", express.static(`${process.env.BACKEND_IMAGE_FOLDER || ""}images`));
  // have BACKEND_IMAGE_FOLDER because local server path is different
  app.use("/images", express.static(`${process.env.BACKEND_IMAGE_FOLDER || ""}images`));


  app.use(authMiddleware())

  //  To do ... add all middlewares here
};
