const jwt = require("jsonwebtoken");
module.exports = () => async (req, res, next) => {
  let isAuthenticated = await checkAuth(req, res);

  if (!isAuthenticated.check) {
    // to do.. check if token expiration on every request in angular app with interceptor and remove it from localstorage
    res.status(401).json({ message: isAuthenticated.msg });
  }




  next();
};

async function checkAuth(req, res) {
  try {
    req.headers.authorization = 'as eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImcudmVsY2hldjEyQGdtYWlsLmNvbSIsImlhdCI6MTYyNTk0OTA0MywiZXhwIjoxNjI1OTUyNjQzfQ.-09PWmVuKW48pdyrJGCB7_rlMs4c8uJoifvFwjcOYWY'
    const tokenFromHeaders = req.headers.authorization?.split(" ")[1];
    await jwt.verify(tokenFromHeaders, process.env.TOKEN_SECRET);

    // Set request information for user
    req.auth = { ...jwt.decode(tokenFromHeaders) };
    console.log(jwt.decode(tokenFromHeaders));

    return { check: true };
  } catch (err) {
    console.log("AuthMiddleware error:", err.message);
    return {
      check: false,
      msg: err instanceof jwt.TokenExpiredError ? "Your session has expired!" : "You are not authenticated!",
    };
  }
}
