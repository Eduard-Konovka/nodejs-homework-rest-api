const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const md5 = require("md5");
const { v4 } = require("uuid");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription, token } = req.body;
  const address = String(email).trim().toLowerCase();
  const hash = md5(address);
  const avatarURL = `https://www.gravatar.com/avatar/${hash}`;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, `Email ${email} in use!`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const verificationToken = v4();

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    token,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:4000/api/users/${verificationToken}">Click here to confirm your email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });

  console.log("\nAdds user: ");
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = signup;
