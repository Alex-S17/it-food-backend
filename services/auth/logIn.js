const bcrypt = require("bcrypt");
const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const {
  NotAuthorizedError,
  VerificationError,
} = require("../../helpers/errors");

const logIn = async (req) => {
  const { email, password } = req?.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError("Email or password is incorrect");
  }

  const { _id, createdAt, password: userPassword, verify } = user;

  if (!(await bcrypt.compare(password, userPassword))) {
    throw new NotAuthorizedError("Email or password is incorrect");
  }

  if (!verify) {
    throw new VerificationError("User not verified");
  }

  const token = jwt.sign({ _id, createdAt }, process.env.SECRET_KEY);

  const result = User.findByIdAndUpdate({ _id }, { token }, { new: true });
  return result;
};

module.exports = { logIn };
