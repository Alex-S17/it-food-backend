const bcrypt = require("bcrypt");
const { User } = require("../../models/userModel");
const createError = require("http-errors");

const jwt = require("jsonwebtoken");

const verifyUser = async (req) => {
  const { verificationCode: receivedCode, email } = req?.body;

  const { _id, createdAt, verificationCode } = await User.findOne({ email });

  if (!(await bcrypt.compare(receivedCode, verificationCode))) {
    return createError(401, "Invalid code");
  }

  const token = jwt.sign({ _id, createdAt }, process.env.SECRET_KEY);

  const result = await User.findOneAndUpdate(
    { verificationCode },
    { verify: true, verificationCode: null, token },
    { new: true }
  );
  return { token: result.token };
};

module.exports = { verifyUser };
