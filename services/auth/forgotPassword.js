const { User } = require("../../models/userModel");
const Email = require("../email/email");

const forgotPassword = async (req) => {
  const { email } = req?.body;

  const user = await User.findOne({ email });

  await new Email(
    user,
    `${process.env.API_URL}/users/forgotpassword/${user.verificationToken}`
  ).passwordReset();
};

module.exports = { forgotPassword };
