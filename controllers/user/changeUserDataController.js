const { userDataChange } = require("../../services/user/userDataChange");

const changeUserDataController = async (req, res) => {
  const result = await userDataChange(req);

  res.status(200).json(result);
};

module.exports = {
  changeUserDataController,
};
