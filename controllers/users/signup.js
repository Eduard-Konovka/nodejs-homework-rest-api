const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");

const signup = async (req, res) => {
  const { email, password, subscription, token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(409, `Email ${email} in use!`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    token,
  });

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
