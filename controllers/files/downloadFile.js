const fs = require("fs").promises;
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = "contactbook";
const tempDir = path.join(__dirname, "../../", "temp");

const downloadFile = async (req, res) => {
  const { fileName } = req.params;
  const destFileName = path.join(tempDir, fileName);

  await storage
    .bucket(bucketName)
    .file(fileName)
    .download({ destination: destFileName });

  res.download(destFileName);

  setTimeout(() => {
    fs.unlink(destFileName);
  }, 100);

  console.log(`\nFile ${fileName} downloaded successfully!`);
};

module.exports = downloadFile;
