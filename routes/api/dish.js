const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/asyncWrapper");

const { getDishesByCategoryController } = require("../../controllers/dishes");

router.get("/:collection", asyncWrapper(getDishesByCategoryController));

module.exports = { dishRouter: router };
