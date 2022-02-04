const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {
  signupJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("../../models");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(signupJoiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(loginJoiSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.patch(
  "/subscription",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateUserSubscription)
);

module.exports = router;
