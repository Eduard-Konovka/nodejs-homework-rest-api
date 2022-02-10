const getAvatar = async (req, res) => {
  const { fileName } = req.params;

  res.redirect(`https://storage.cloud.google.com/contactbook/${fileName}`);

  console.log(`\nFile ${fileName} find!`);
};

module.exports = getAvatar;
