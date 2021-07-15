const jwt = require("jsonwebtoken");
module.exports = () => async (req, res, next) => {
  // to do.. check if token expiration on every request in angular app with interceptor and remove it from localstorage

  // Check Auth on every request handler

  req.auth = {
    createToken,
  };

  const tokenFromHeaders = req.headers.authorization?.split(" ")[1] || false;

  if (tokenFromHeaders) {
    try {
      const userData = jwt.verify(tokenFromHeaders, process.env.TOKEN_SECRET);
      // Set request information for user
      req.user = userData;
    } catch (err) {
      console.log("AuthMiddleware error:", err.message);
    }
  }

  function createToken(user) {
    const userViewModel = { _id: user._id, email: user.email };

    const token = jwt.sign(
      userViewModel, 
      process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      expiresIn: 3600,
      userEmail: user.email,
    };
  }

  next();
};
