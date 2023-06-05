const { User } = require("../../models/userModel");
const { sendVerifiedEmail } = require("../../helpers/SGSendEmail");

const passwordReset = async (req) => {
  const { verificationToken } = req?.params;
  const newPassword = Math.random().toString(36).slice(-8);

  const user = await User.findOneAndUpdate(
    {
      verificationToken,
    },
    { password: newPassword },
    { new: true }
  );

  console.log(user);

  sendVerifiedEmail(user.email, newPassword);
};
module.exports = { passwordReset };
