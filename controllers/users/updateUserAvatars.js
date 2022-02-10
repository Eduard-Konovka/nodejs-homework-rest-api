const fs = require("fs").promises;
const Jimp = require("jimp");
const { Storage } = require("@google-cloud/storage");
const { User } = require("../../models");

const storage = new Storage();
const bucketName = "contactbook";

const updateUserAvatars = async (req, res) => {
  const { _id: userId } = req.user;
  const { path, destination, filename } = req.file;
  const [extension] = filename.split(".").reverse();
  const newFileName = `${userId}.${extension}`;

  await Jimp.read(path).then((file) =>
    file.resize(250, 250).write(`${destination}/${filename}`)
  );

  await storage.bucket(bucketName).upload(path, {
    destination: newFileName,
  });

  await fs.unlink(path);

  const avatarURL = `https://storage.cloud.google.com/contactbook/${newFileName}`;

  await User.findByIdAndUpdate(
    userId,
    { avatarURL },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    code: 200,
    data: {
      avatarURL,
    },
  });

  console.log("\nUpdated avatarURL: ", avatarURL);
};

module.exports = updateUserAvatars;
