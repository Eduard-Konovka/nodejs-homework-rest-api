const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getList));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));
router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.update));
router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);
router.delete("/:contactId", ctrlWrapper(ctrl.remove));

module.exports = router;
