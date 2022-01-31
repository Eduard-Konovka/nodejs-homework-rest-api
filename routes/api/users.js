const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));

module.exports = router;
