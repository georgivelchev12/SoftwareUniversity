async function createPhoto(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  res.status(200).json({ message: "List Users" });
}
module.exports = {
  createPhoto,
};
