const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const mail = { ...data, from: "ed098ua@i.ua" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
