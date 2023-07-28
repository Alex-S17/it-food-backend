const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const {
  addOrderController,
  getOrderByPhoneController,
  deleteOrderController,
  confirmOrderController,
  getUserOrderCountController,
  getUserOrderController,
  getOrderByIdController,
} = require("../../controllers/order");

const { authMiddleware, orderMiddleware } = require("../../middleware");

router.post("/", orderMiddleware, asyncWrapper(addOrderController));
router.post("/byPhone", asyncWrapper(getOrderByPhoneController));
router.post("/delete", asyncWrapper(deleteOrderController));
router.patch("/confirm", asyncWrapper(confirmOrderController));
router.get("/count", authMiddleware, asyncWrapper(getUserOrderCountController));

router.get("/history", authMiddleware, asyncWrapper(getUserOrderController));
router.get("/:orderId", authMiddleware, asyncWrapper(getOrderByIdController));

module.exports = { userOrder: router };
