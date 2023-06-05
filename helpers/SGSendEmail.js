const sgMail = require("@sendgrid/mail");
const { verifiedEmail } = require("../templates/verifiedEmailTemplate");
const {
  changePasswordEmail,
} = require("../templates/changePasswordEmailTemplate");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerifiedEmail = (userMail, code) => {
  const msg = {
    to: userMail,
    from: "no-reply-node.js-app@meta.ua",
    subject: " Verify Email Address node.js App",
    html: verifiedEmail(code),
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
const sendChangePasswordEmail = (userMail, verifyToken) => {
  const msg = {
    to: userMail,
    from: "no-reply-node.js-app@meta.ua",
    subject: " Verify Email Address node.js App",
    html: changePasswordEmail(verifyToken),
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

module.exports = { sendVerifiedEmail, sendChangePasswordEmail };
