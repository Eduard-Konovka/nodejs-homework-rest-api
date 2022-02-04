const { Contact, contactJoiSchema, favoriteJoiSchema } = require("./contact");
const {
  User,
  signupJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("./user");

module.exports = {
  Contact,
  contactJoiSchema,
  favoriteJoiSchema,
  User,
  signupJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
};
