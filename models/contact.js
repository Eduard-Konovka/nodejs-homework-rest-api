const { Schema, model } = require("mongoose");
const Joi = require("joi");

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegExp =
  /^\+?.\(?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      match: nameRegExp,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegExp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp).required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
