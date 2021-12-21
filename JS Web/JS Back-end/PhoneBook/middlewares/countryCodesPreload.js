const countryCodes = require("../config/countryCodes");

async function init() {
  return (req, res, next) => {
    req.countryCodes = countryCodes;
    next();
  };
}
module.exports = init;
