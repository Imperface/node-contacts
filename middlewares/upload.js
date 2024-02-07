const multer = require("multer");
const path = require("node:path");
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
      return cb(new Error("Invalid mime type"));
    }
  },
});

module.exports = upload;
