const NotFound = require("http-errors");
const { Contact } = require("../../models");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(404, `Contact with id = ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted!",
    data: {
      result,
    },
  });
  console.log("\nRemoved contact: ");
  console.log(result);
};

module.exports = remove;
