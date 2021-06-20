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

    // Remove later
    app.get("/", (req, res) => {
        res.send("It works");
    });

    app.listen(PORT, () => {
        console.log(`Server listen on port: http://localhost:${PORT}`);
    });
})();

// const authMiddleware = require("./middlewares/auth");
// async function testAuth(params) {
//     const reqMock = {};
//     const resMock = {
//         cookie() {
//             console.log("Set cookie", arguments);
//         },
//     };

//     const nextMock = () => {};

//     try {
//          authMiddleware(reqMock, resMock, nextMock);
//         await reqMock.auth.login("etercho", "123asdd");
//     } catch (err) {
//         console.log("Error:", err.message);
//     }
// }
