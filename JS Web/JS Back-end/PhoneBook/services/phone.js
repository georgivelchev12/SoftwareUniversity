const Phone = require("../models/Phone");

async function getAll(query) {
  const options = {};

  if (query.search) {
    options.$or = [
      { firstName: { $regex: query.search, $options: "i" } },
      { lastName: { $regex: query.search, $options: "i" } },
      { phone: { $regex: query.search, $options: "i" } },
    ];
  }
  if (query.countryCode != '0' && query.countryCode) {
    options.countryCode = Number(query.countryCode);
  }
  const phones = Phone.find(options).lean();
  return phones;
}

async function create(phone) {
  // Validate phone.
  const record = new Phone(phone);
  // it returns promise
  return record.save();
}


module.exports = {
  getAll,
  create,
};
