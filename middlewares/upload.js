const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.resolve("./temp"));
  },
  filename: (_, file, cb) => {
    const [extension, ...filename] = file.originalname.split(".").reverse();
    const [pureFilename] = [...filename].reverse();
    cb(
      null,
      `${pureFilename}-${Math.floor(Math.random() * 1000)}.${extension}`
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
