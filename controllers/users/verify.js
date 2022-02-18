const createError = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const verify = async (req, res) => {
  if (!req.body) {
    throw createError(400, "Missing required field email!");
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user.verify) {
    throw createError(400, "Verification has already been passed!");
  }

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:4000/api/users/${user.verificationToken}">Click here to confirm your email</a>`,
  };
  await sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });

  console.log("\nVerification email sent!");
};

module.exports = verify;
