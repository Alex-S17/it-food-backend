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
const {
  deleteOrderController,
} = require("../../controllers/order/deleteOrderController");

router.post("/", orderMiddleware, asyncWrapper(addOrderController));
router.post("/last", orderMiddleware, asyncWrapper(getLastOrderController));
router.post("/delete", asyncWrapper(deleteOrderController));

module.exports = { userOrder: router };
