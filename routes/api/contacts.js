const express = require("express");

const { ctrlWrapper } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getList));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", ctrlWrapper(ctrl.add));
router.put("/:contactId", ctrlWrapper(ctrl.update));
router.delete("/:contactId", ctrlWrapper(ctrl.remove));

module.exports = router;
