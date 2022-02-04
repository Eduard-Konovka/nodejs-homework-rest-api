const { Schema, model } = require("mongoose");
const Joi = require("joi");

const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;
const emailRegExp = /.+@.+\..+/i;

const userSchema = Schema(
  {
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

const signupJoiSchema = Joi.object({
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

const loginJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .pattern(emailRegExp)
    .required(),
  password: Joi.string().min(8).max(50).pattern(passRegExp).required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  signupJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
};
