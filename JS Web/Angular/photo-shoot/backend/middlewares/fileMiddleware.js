const fs = require("fs");
const multer = require("multer");
// Image processing
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }

    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear()
    let pathToStoreImg = `/${year}/${month}`;

    if (file.originalname.includes('@')) {
      pathToStoreImg = `/users`
    }


    fs.mkdir(
        `${process.env.BACKEND_IMAGE_FOLDER || ""}images${pathToStoreImg}`,
        { recursive: true },
        error => cb(error, `${process.env.BACKEND_IMAGE_FOLDER || ""}images${pathToStoreImg}`)
    )

    // fs.mkdir(
    //     `${process.env.BACKEND_IMAGE_FOLDER || ""}images${imageStorageMap[req.originalUrl]}`,
    //     { recursive: true },
    //     cb(error, `${process.env.BACKEND_IMAGE_FOLDER || ""}images${imageStorageMap[req.originalUrl]}`)
    // )
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

module.exports = multer({ storage: storage }).single("image");
