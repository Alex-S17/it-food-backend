const bcrypt = require("bcrypt");
const { User } = require("../../models/userModel");
const createError = require("http-errors");

const jwt = require("jsonwebtoken");

const verifyUser = async (req) => {
  const { verificationCode: receivedCode, email: receivedEmail } = req?.body;

  const { _id, createdAt, verificationCode } = await User.findOne({
    email: receivedEmail,
  });

  if (!(await bcrypt.compare(receivedCode, verificationCode))) {
    throw createError(401, "Invalid code");
  }

  const createdToken = jwt.sign({ _id, createdAt }, process.env.SECRET_KEY);

  const { name, password, phone, email, token, avatarUrl } =
    await User.findOneAndUpdate(
      { verificationCode },
      { verify: true, verificationCode: null, token: createdToken },
      { new: true }
    );
  return { name, password, phone, email, token, avatarUrl };
};

module.exports = { verifyUser };
