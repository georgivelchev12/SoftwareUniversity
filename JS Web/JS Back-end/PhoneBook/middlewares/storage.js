
const phoneService = require('../services/phone');

async function init() {
    return (req, res, next) => {
        const storage = phoneService
        req.storage = storage;
        next();
    };
}

module.exports = init;