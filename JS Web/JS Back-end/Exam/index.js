const express = require("express");

const { PORT } = require("./config");
const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");

(async function () {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(PORT, () => {
        console.log(`Server listen on port: http://localhost:${PORT}`);
    });
})();