const express = require("express");

const { auth, validation, upload, ctrlWrapper } = require("../../middlewares");
const {
  signupJoiSchema,
  verifyJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("../../models");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(signupJoiSchema), ctrlWrapper(ctrl.signup));
router.get(
  "/verify/:verificationToken",
  validation(signupJoiSchema),
  ctrlWrapper(ctrl.verificationToken)
);
router.post("/verify", validation(verifyJoiSchema), ctrlWrapper(ctrl.verify));
router.post("/login", validation(loginJoiSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/subscription",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateUserSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateUserAvatars)
);

module.exports = router;
