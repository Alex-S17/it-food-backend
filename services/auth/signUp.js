const { User } = require("../../models/userModel");
const { sendEmail } = require("../../helpers/SGSendEmail");

const signUp = async (req) => {
  const { name, email, phone, password } = req.body;

  const avatarUrl =
    "https://i.discogs.com/yLOD-rGjavMFtHOG5Nk7cKduHZ6R0w-iznYuQle9QLc/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTY2OTQx/OC0xNDE0OTMzNTgy/LTUyNDguanBlZw.jpeg";

  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  sendEmail(email, verificationCode);

  return await User.create({
    name,
    email,
    phone,
    password,
    avatarUrl,
    verificationCode,
  });
};

module.exports = { signUp };
