const { currentUser } = require("../../services/user/currentUser");

const currentUserController = async (req, res) => {
  const result = await currentUser(req);
  // console.log("result=", result);
  res.status(200).json(result);
};

module.exports = {
  currentUserController,
};
