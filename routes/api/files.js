const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./temp"));
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${filename}-${Math.floor(Math.random() * 1000)}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });
const { auth, ctrlWrapper } = require("../../middlewares");
const { files: ctrl } = require("../../controllers");

router.post(
  "/upload",
  auth,
  uploadMiddleware.single("avatar"),
  ctrlWrapper(ctrl.uploadFile)
);
router.get("/:fileName", auth, ctrlWrapper(ctrl.downloadFile));

module.exports = router;
