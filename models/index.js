const { Contact, contactJoiSchema, favoriteJoiSchema } = require("./contact");
const {
  User,
  signupJoiSchema,
  verifyJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("./user");

module.exports = {
  Contact,
  contactJoiSchema,
  favoriteJoiSchema,
  User,
  signupJoiSchema,
  verifyJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
};
