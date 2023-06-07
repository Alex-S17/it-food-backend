const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  currentUserController,
} = require("../../controllers/user/currentUserController");

router.get("/current", authMiddleware, asyncWrapper(currentUserController));

module.exports = { userRouter: router };
