const NotFound = require("http-errors");
const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw new NotFound(404, `Contact with id ${contactId} not found!`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });

  console.log("\nContact by id: ");
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = getById;
