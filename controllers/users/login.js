const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, `Email ${email} is wrong!`);
  }

  if (!user.verify) {
    throw createError(401, `Email ${email} is not verify!`);
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, `Password ${password} is wrong!`);
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });

  console.log("\nGot a token: ", token);
  console.log("\nUser: ");
  console.table(JSON.parse(JSON.stringify(user)));
};

module.exports = login;
