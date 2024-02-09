const multer = require("multer");
const path = require("node:path");
const { HttpError } = require("../utils");
const tempDir = path.join(__dirname, "..", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  onError: (error, next) => {
    console.log(error);
    next(error);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(HttpError(400, "Invalid mime type"), false);
    }
  },
});

module.exports = upload;
