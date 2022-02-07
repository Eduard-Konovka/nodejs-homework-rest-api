const fs = require("fs").promises;
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "contactbook";

const uploadFile = async (req, res) => {
  const filePath = `./temp/${req.file.filename}`;

  await storage.bucket(bucketName).upload(filePath, {
    destination: req.file.filename,
  });

  await fs.unlink(filePath);

  res.status(201).json({
    status: "success",
    code: 201,
    message: `File ${req.file.originalname} added successfully and saved with the name ${req.file.filename}!`,
  });

  console.log(
    `\nFile ${req.file.filename} uploaded to ${bucketName} successfully!`
  );
};

module.exports = uploadFile;
