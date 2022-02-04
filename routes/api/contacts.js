const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { contactJoiSchema, favoriteJoiSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getList));
router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));
router.post("/", auth, validation(contactJoiSchema), ctrlWrapper(ctrl.add));
router.put(
  "/:contactId",
  auth,
  validation(contactJoiSchema),
  ctrlWrapper(ctrl.update)
);
router.patch(
  "/:contactId/favorite",
  auth,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateContactStatus)
);
router.delete("/:contactId", auth, ctrlWrapper(ctrl.remove));

module.exports = router;
