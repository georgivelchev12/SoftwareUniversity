const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");

const app = require("express")();

databaseConfig(app);
expressConfig(app);
routesConfig(app);

const port = process.env.PORT || 3000
app.listen(port, console.log(`Listening on port ${port}!`));