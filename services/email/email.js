const pug = require("pug");
const sgMail = require("@sendgrid/mail");
const path = require("path");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url, key) {
    this.to = user.email;
    this.name = user.name;
    this.key = key;
    this.url = url;
    this.from = `IT FOOD <${process.env.EMAIL_FROM}>`;
  }

  _initTransport() {
    return sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "..", "views", "emails", `${template}.pug`),
      {
        name: this.name,
        key: this.key,
        newPassword: this.newPassword,
        url: this.url,
        subject,
      }
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      html,
      subject,
      text: convert(html),
    };
    await this._initTransport().send(emailConfig);
  }

  async passwordReset() {
    this._send("passwordReset", "IT FOOD Password Reset");
  }

  async emailConfirmation() {
    this._send("sendConfirmation", "IT FOOD Email Verification");
  }

  async newPassword() {
    this._send("sendNewPassword", "IT FOOD Change Password");
  }
};
