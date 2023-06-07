const bcrypt = require("bcrypt");
const { User } = require("../../models/userModel");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const logIn = async (req) => {
  const { email, password } = req?.body;

  const {
    _id,
    createdAt,
    password: userPassword,
    verify,
  } = await User.findOne({ email });

  if (!(await bcrypt.compare(password, userPassword))) {
    throw createError(401, "Email or password is incorrect");
  }

  if (!verify) {
    throw createError(401, "User not verified");
  }

  const token = jwt.sign({ _id, createdAt }, process.env.SECRET_KEY);

  const result = User.findByIdAndUpdate({ _id }, { token }, { new: true });
  return result;
};

module.exports = { logIn };
