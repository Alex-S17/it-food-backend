const { getDishesByCategory } = require("../../services/dishes");

const getDishesByCategoryController = async (req, res) => {
  const result = await getDishesByCategory(req);
  res.json(result);
};

module.exports = { getDishesByCategoryController };
