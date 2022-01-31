const { Contact } = require("../../models/contact");

const getList = async (req, res) => {
  const { _id } = req.user;
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });

  console.log("\nContacts list: ");
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = getList;
