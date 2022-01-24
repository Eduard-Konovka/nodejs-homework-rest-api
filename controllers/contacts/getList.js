const { Contact } = require("../../models/contact");

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
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = getList;
