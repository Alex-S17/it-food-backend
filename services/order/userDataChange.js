const { User } = require("../../models/userModel");

const userDataChange = async (req) => {
  const { _id } = req.user;
  const { name, phone } = req.body;
  const avatarUrl = req.file?.path;

  return await User.findByIdAndUpdate(
    { _id },
    { name, phone, avatarUrl },
    { new: true }
  );
};

module.exports = { userDataChange };
