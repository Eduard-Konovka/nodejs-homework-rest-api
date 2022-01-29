const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
