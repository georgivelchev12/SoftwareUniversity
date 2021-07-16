function isUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: "You are not authenticated" });
    }
  };
}
function isGuest() {
  return (req, res, next) => {
    if (req.user == undefined) {
      console.log("in guard", req.user);
      next();
    } else {
      res.status(401).json({ message: "You already logged in!" });
    }
  };
}
 

module.exports = {
  isGuest,
  isUser,
};

// To do... is owner, etc.
