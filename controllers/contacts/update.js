const NotFound = require("http-errors");
const { Contact } = require("../../models/contact");

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(404, `Contact with id = ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
  console.log("\nUpdated contact: ");
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = update;
