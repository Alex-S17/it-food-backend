const { User } = require("../../models/userModel");
const { sendEmail } = require("../../helpers/SGSendEmail");

const signUp = async (req) => {
  const { name, email, phone, password } = req.body;

  const avatar = "https://publicdomainvectors.org/tn_img/Linux-Avatar.webp";

  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  sendEmail(email, verificationCode);

  return await User.create({
    name,
    email,
    phone,
    password,
    avatar,
    verificationCode,
  });
};

module.exports = { signUp };
