const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const {
  addOrderController,
} = require("../../controllers/order/addOrderController");
const { orderMiddleware } = require("../../middleware/orderMiddleware");
const {
  getLastOrderController,
} = require("../../controllers/order/getLastOrderController");

router.post("/", orderMiddleware, asyncWrapper(addOrderController));
router.post("/last", orderMiddleware, asyncWrapper(getLastOrderController));

module.exports = { userOrder: router };
