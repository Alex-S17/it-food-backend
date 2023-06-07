const { User } = require("../../models/userModel");

const Email = require("../email/email");

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

  await new Email(user, null, newPassword).newPassword();
};
module.exports = { passwordReset };
