const createError = require("http-errors");
const { User } = require("../../models");

const updateUserSubscription = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;

  if (!req.body) {
    throw createError(400, "Missing field of subscription!");
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { subscription },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });

  console.log("\nUpdated subscription: ");
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = updateUserSubscription;
