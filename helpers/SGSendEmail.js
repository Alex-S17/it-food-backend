const sgMail = require("@sendgrid/mail");
const { emailTemplate } = require("../templates/emailTemplate");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (userMail, code) => {
  const msg = {
    to: userMail,
    from: "no-reply-node.js-app@meta.ua",
    subject: " Verify Email Address node.js App",
    html: emailTemplate(code),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendEmail };
