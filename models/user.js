const { Schema, model } = require("mongoose");
const Joi = require("joi");

const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
const emailRegExp = /.+@.+\..+/i;

const userSchema = Schema(
  {
    owner: {
      type: String,
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 60,
      match: passRegExp,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSignupSchema = Joi.object({
  owner: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .pattern(emailRegExp)
    .required(),
  password: Joi.string().min(8).max(50).pattern(passRegExp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .pattern(emailRegExp)
    .required(),
  password: Joi.string().min(8).max(50).pattern(passRegExp).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
};
