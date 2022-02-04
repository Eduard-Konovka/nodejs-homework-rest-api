const { Contact } = require("../../models");

const getList = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = favorite ? { owner: _id, favorite } : { owner: _id };

  const result = await Contact.find(query, "-createdAt -updatedAt", {
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

  const statusList = favorite
    ? "\nFavorite contacts list: "
    : "\nContacts list: ";
  console.log(statusList);
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = getList;
