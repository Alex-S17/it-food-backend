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
const {
  confirmOrderController,
} = require("../../controllers/order/confirmOrderController");
const {
  getUserOrderController,
} = require("../../controllers/order/getUserOrderController");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/", orderMiddleware, asyncWrapper(addOrderController));
router.post("/last", orderMiddleware, asyncWrapper(getLastOrderController));
router.post("/delete", asyncWrapper(deleteOrderController));
router.patch("/confirm", asyncWrapper(confirmOrderController));

router.get("/history", authMiddleware, asyncWrapper(getUserOrderController));

module.exports = { userOrder: router };
