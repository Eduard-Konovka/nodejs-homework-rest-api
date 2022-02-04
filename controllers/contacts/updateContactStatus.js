const { BadRequest, NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!req.body) {
    throw new BadRequest(400, "Missing field favorite!");
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

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

  console.log("\nUpdated favorite: ");
  console.table(JSON.parse(JSON.stringify(result)));
};

module.exports = updateContactStatus;
