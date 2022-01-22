const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),

  phone: Joi.string()
    .pattern(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
    console.log("\nContacts list: ");
    console.table(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404, `Contact with id = ${contactId} not found!`);
    }
    res.json(result);
    console.log("\nContact by id: ");
    console.table(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, {
        message: `Missing required field: ${error.message}`,
      });
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
    console.log("\nAdds contact: ");
    console.table(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, { message: `Missing fields: ${error.message}` });
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContact(contactId, name, email, phone);
    if (!result) {
      throw createError(404, `Contact with id = ${contactId} not found!`);
    }
    res.json(result);
    console.log("\nUpdated contact: ");
    console.table(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw createError(404, `Contact with id = ${contactId} not found!`);
    }
    res.json({ message: "Contact deleted!", deletedContact: result });
    console.log("\nRemoved contact: ");
    console.table(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
