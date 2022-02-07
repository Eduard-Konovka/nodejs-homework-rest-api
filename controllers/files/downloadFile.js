const fs = require("fs").promises;
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "contactbook";

const downloadFile = async (req, res) => {
  const { fileName } = req.params;
  const destFileName = `./public/avatars/${fileName}`;

  await storage
    .bucket(bucketName)
    .file(fileName)
    .download({ destination: destFileName });

  res.download(destFileName);

  setTimeout(() => {
    fs.unlink(`./public/avatars/${fileName}`);
  }, 100);

  console.log(`\nFile ${fileName} downloaded successfully!`);
};

module.exports = downloadFile;
