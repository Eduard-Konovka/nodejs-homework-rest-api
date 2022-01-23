const { Contact } = require("../../models");

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
  console.log("\nAdds contact: ");
  console.log(result);
};

module.exports = add;