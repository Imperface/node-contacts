const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  // create email object for sending
  const email = { ...data, from: "kovzhenko.ua@gmail.com" };

  // send verification mail
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
