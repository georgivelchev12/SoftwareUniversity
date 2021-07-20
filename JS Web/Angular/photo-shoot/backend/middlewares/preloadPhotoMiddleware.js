// Into question?

// function preloadCube() {
//   return async (req, res, next) => {
//     try {
//       const photo = await Course.findById({ _id: req.params.id }).populate("categories", "author").lean();
//       if (photo) {
//         req.photo = photo;
//       }
//     } catch (err) {
//       console.error("Database error: ", err.message);
//     }
//     next();
//   };
// }

// module.exports = {
//   preloadCube,
// };
