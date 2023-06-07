const { sendChangePasswordEmail } = require("../../helpers/SGSendEmail");
const { User } = require("../../models/userModel");

const forgotPassword = async (req) => {
  const { email } = req?.body;

  const user = await User.findOneAndUpdate({ email });

  console.log(user);

  sendChangePasswordEmail(user.email, user.verificationToken);

  return { result: "forgotPassword" };
};

module.exports = { forgotPassword };
