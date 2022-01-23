const { Contact } = require("../../models");

const getList = async (_, res) => {
  const result = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
  console.log("\nContacts list: ");
  console.log(result);
};

module.exports = getList;
