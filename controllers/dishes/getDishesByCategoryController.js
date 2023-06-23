const {
  getDishesByCategory,
} = require("../../services/dishes/getDishesByCategory");

const getDishesByCategoryController = async (req, res) => {
  const result = await getDishesByCategory(req);
  res.json(result);
};

module.exports = { getDishesByCategoryController };
