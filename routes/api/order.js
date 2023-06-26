const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const {
  addOrderController,
} = require("../../controllers/order/addOrderController");
const { addOrderMiddleware } = require("../../middleware/addOrderMiddleware");

router.post("/", addOrderMiddleware, asyncWrapper(addOrderController));

module.exports = { userOrder: router };
