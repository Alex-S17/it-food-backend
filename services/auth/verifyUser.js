const bcrypt = require("bcrypt");
const { User } = require("../../models/userModel");

const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../../helpers/errors");

const verifyUser = async (req) => {
  const { verificationCode: receivedCode, email: receivedEmail } = req?.body;

  const user = await User.findOne({
    email: receivedEmail,
  });

  if (!user) throw new NotAuthorizedError("Verification error");

  const { _id, createdAt, verificationCode } = user;

  if (!(await bcrypt.compare(receivedCode, verificationCode))) {
    throw new NotAuthorizedError("Verification error");
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
