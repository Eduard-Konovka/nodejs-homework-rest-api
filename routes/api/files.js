const express = require("express");
const router = express.Router();

const { auth, upload, ctrlWrapper } = require("../../middlewares");
const { files: ctrl } = require("../../controllers");

router.post(
  "/upload",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.uploadFile)
);
router.get("/download/:fileName", auth, ctrlWrapper(ctrl.downloadFile));
router.get("/:fileName", auth, ctrlWrapper(ctrl.getAvatar));

module.exports = router;
