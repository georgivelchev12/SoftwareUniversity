const express = require("express");
// const cookieParser = require("cookie-parser");
const bodyParser = require("express").urlencoded;
const expressSession = require("express-session");

const auth = require("./auth");
const routes = require("./controllers");

// const sessions = {};

// function mySessionStorage(req, res, next) {
//     let session = {};
//     if (req.headers.cookie) {
//         const id = req.headers.cookie.split("=")[1];
//         if (sessions[id] == undefined) {
//             console.log("Invalid session cookie, generating new");
//             createSession();
//         } else {
//             session = sessions[id];
//             console.log("Existing session", session);
//         }
//     } else {
//         createSession();
//     }
//     req.session = session;
//     next();
//     function createSession() {
//         const id = (
//             "0000000" + ((Math.random() * 99999999) | 0).toString(16)
//         ).slice(-8);
//         sessions[id] = session;
//         res.setHeader("Set-Cookie", `sessionId=${id}`);
//         console.log("New user, generated session with id", id);
//         session.visited = 0;
//     }
// }

// function mySessionStorage(req, res, next) {
//     let session = {};
//     if (req.cookies.sessionId && sessions[req.cookies.sessionId] != undefined) {
//         const id = req.cookies.sessionId;
//         session = sessions[id];
//         console.log("Existing session", session);
//     } else {
//         createSession();
//     }
//     req.session = session;
//     next();
//     function createSession() {
//         const id = (
//             "0000000" + ((Math.random() * 99999999) | 0).toString(16)
//         ).slice(-8);
//         sessions[id] = session;
//         res.cookie('sessionId', id)
//         console.log("New user, generated session with id:", id);
//         session.visited = 0;
//     }
// }

// app.use(cookieParser());
// app.use(mySessionStorage);

const app = express();

app.use(bodyParser({ extended: false }));

app.use(
    expressSession({
        secret: "my random secred",
        resave: false,
        saveUninitialized: true,
        cookie: {
            // Its for http/https
            secure: false,
        },
    })
);

app.all("*", (req, res, next) => {
    if (req.url.includes("favicon") == false) {
        console.log(">>> ", req.method, req.url, req.body, req.session);
    }
    next();
});

app.use(auth);
routes(app);

app.post("/register", async (req, res) => {
    await req.register(req.body.username, req.body.password);
    res.redirect("/login");
});

app.post("/login", async (req, res) => {
    const passwordsMatch = await req.login(req.body.username, req.body.password);
    if (passwordsMatch) {
        res.redirect("/");
    } else {
        res.send(403, "Wrong password");
    }
});

app.listen(3000);
