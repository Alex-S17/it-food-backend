const { User } = require("../../models/userModel");
const Email = require("../email/email");
const { VerificationError } = require("../../helpers/errors");

const forgotPassword = async (req) => {
  const { email } = req?.body;

  const user = await User.findOne({ email });

  if (!user) throw new VerificationError("User not found");

  if (!user.verify) throw new VerificationError("User not verified");

  await new Email(
    user,
    `${process.env.API_URL}/users/forgotpassword/${user.verificationToken}`
  ).passwordReset();
};

module.exports = { forgotPassword };
