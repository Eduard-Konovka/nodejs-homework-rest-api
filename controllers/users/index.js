const signup = require("./signup");
const verificationToken = require("./verificationToken");
const verify = require("./verify");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const updateUserSubscription = require("./updateUserSubscription");
const updateUserAvatars = require("./updateUserAvatars");

module.exports = {
  signup,
  verify,
  verificationToken,
  login,
  current,
  logout,
  updateUserSubscription,
  updateUserAvatars,
};
