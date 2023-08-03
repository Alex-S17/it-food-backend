// const { currentUser } = require("../../services/user");

const currentUserController = async (req, res) => {
  // const result = await currentUser(req);

  // res.status(200).json(result);
  // console.log("RRRreq.user", req.user);
  // console.log("result", result);
  res.status(200).json(req.user);
};

module.exports = {
  currentUserController,
};
