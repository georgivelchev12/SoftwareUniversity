module.exports = (app) => {
    app.get("/", (req, res, next) => {
        let title = "Welcome";
        if (req.session.user) {
            title = "Welcome, " + req.session.user.username;
        }
        res.send(layout("<p>Home Page</p>", title));
    });

    app.get("/register", (req, res) => {
        let title = "Welcome";
        if (req.session.user) {
            title = "Welcome, " + req.session.user.username;
        }
        res.send(
            layout(
                `<form action="/register" method="POST">
                    <label>Username: <input type="text" name="username"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <label>Repeat: <input type="password" name="repassword"></label>
                    <input type="submit" value="Register"> 
                </form>`,
                title
            )
        );
    });
    
    app.get("/login", (req, res) => {
        let title = "Welcome";
        if (req.session.user) {
            title = "Welcome, " + req.session.user.username;
        }
        res.send(
            layout(
                `<form action="/login" method="POST">
                    <label>Username: <input type="text" name="username"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <input type="submit" value="Login"> 
                </form>`,
                title
            )
        );
    });
};

function layout(html, title) {
    return `
        <h1>${title}</h1> 
        <a href="/">Home</a> 
        <a href="/login">Login</a> 
        <a href="/register">Register</a>
        ${html}
    `;
}
