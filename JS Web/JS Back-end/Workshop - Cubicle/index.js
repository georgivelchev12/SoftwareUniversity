// const env = process.env.NODE_ENV || 'development';

// const config = require('./config/config')[env];
// const app = require('express')();

// require('./config/express')(app);
// require('./config/routes')(app);

// app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

const hbs = require("express-handlebars");
const express = require("express");
const { catalog } = require("./config/catalog");
const { about } = require("./config/about");
const { details } = require("./config/details");
const { create, createPost } = require("./config/create");
const { notFound } = require("./config/notFound");
const { init: storage } = require("./models/storage");
const { edit, editPost } = require("./config/edit");

const app = express();
const port = 3000;

start();
async function start() {
  app.engine(
    ".hbs",
    hbs({
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.use("/static", express.static("static"));
  app.use("/js", express.static("js"));

  app.use(express.urlencoded({ extended: false }));
  app.use(await storage());

  app.get("/", catalog);
  app.get("/about", about);
  app.get("/details/:id", details);
  app.get("/create", create);
  app.post("/create", createPost);
  app.get("/edit/:id", edit);
  app.post("/edit/:id", editPost);
  app.all("*", notFound);

  app.listen(port, () => console.log(`Server listening on port ${port}`));
}
