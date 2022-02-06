const { Contact } = require("../../models");

const getList = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite, sort } = req.query;
  const skip = (page - 1) * limit;

  const query = favorite ? { owner: _id, favorite } : { owner: _id };

  const result = await Contact.find(query)
    .select("-createdAt -updatedAt")
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort)
    .populate("owner", "_id email subscription");
  // // Альтернатива:
  // const result = await Contact.find(query, "-createdAt -updatedAt", {
  //   skip,
  //   limit: Number(limit),
  // })
  //   .sort({ name: 1 })
  //   .populate("owner", "_id email subscription");

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
