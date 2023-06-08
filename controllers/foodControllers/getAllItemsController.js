const { getAllItems } = require("../../services/foodItemServices/getAllItems");

const getAllItemsController = async (req, res) => {
  const result = await getAllItems();
  console.log("result=", result);
  return res.status(200).json(result);
};

module.exports = {
  getAllItemsController,
};
