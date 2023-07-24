const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const {
  addOrderController,
} = require("../../controllers/order/addOrderController");
const { orderMiddleware } = require("../../middleware/orderMiddleware");

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

const {
  getOrderByIdController,
} = require("../../controllers/order/getOrderByIdController");
const {
  getUserOrderCountController,
} = require("../../controllers/order/getUserOrderCountController");
const {
  getOrderByPhoneController,
} = require("../../controllers/order/getOrderByPhoneController");

router.post("/", orderMiddleware, asyncWrapper(addOrderController));
router.post("/byPhone", asyncWrapper(getOrderByPhoneController));
router.post("/delete", asyncWrapper(deleteOrderController));
router.patch("/confirm", asyncWrapper(confirmOrderController));
router.get("/count", authMiddleware, asyncWrapper(getUserOrderCountController));

router.get("/history", authMiddleware, asyncWrapper(getUserOrderController));
router.get("/:orderId", authMiddleware, asyncWrapper(getOrderByIdController));

module.exports = { userOrder: router };
