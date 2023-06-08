const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const {
  getAllItemsController,
} = require("../../controllers/foodControllers/getAllItemsController");

router.get("/", asyncWrapper(getAllItemsController));

module.exports = router;
