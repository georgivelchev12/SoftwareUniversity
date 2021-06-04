const hbs = require("express-handlebars");
const express = require("express");
module.exports = (app) => {
    app.engine(".hbs", hbs({
        extname: ".hbs",
    }));
    app.set("view engine", "hbs");
    app.use("/static", express.static("static"));
    app.use("/js", express.static("js"));
    app.use(express.urlencoded({ extended: false }));
};
