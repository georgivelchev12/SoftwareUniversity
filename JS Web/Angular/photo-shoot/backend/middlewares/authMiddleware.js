const jwt = require("jsonwebtoken");
module.exports = () => (req, res, next) => {
  // to do.. check if token expiration on every request in angular app with interceptor and remove it from localstorage

  req.auth = {
    createToken,
  };

  try {
    const tokenFromHeaders = req.headers.authorization?.split(" ")[1];
    if (tokenFromHeaders !== undefined) {
      const userData = jwt.verify(tokenFromHeaders, process.env.TOKEN_SECRET);
      req.user = userData;
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid access token! Please login." });
    return;
  }

  function createToken(user) {
    const userViewModel = {
      _id: user._id,
      email: user.email,
      role: "admin",
    };

    const token = jwt.sign(userViewModel, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      expiresIn: 3600,
      userEmail: user.email,
    };
  }
};
