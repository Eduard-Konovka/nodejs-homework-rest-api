const createError = require("http-errors");
const { User } = require("../../models");

const verificationToken = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, `User not found!`);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });

  console.log("\nVerification successful!");
};

module.exports = verificationToken;
