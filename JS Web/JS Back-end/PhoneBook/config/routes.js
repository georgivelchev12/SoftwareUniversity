const phoneController = require("../controllers/phoneController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
    app.use("/phones", phoneController);
    app.use("/", homeController)
};
