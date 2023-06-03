const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const { signUpController } = require("../../controllers/auth/signUpController");
const { logInController } = require("../../controllers/auth/logInController");
const {
  verifiedController,
} = require("../../controllers/auth/verifiedController");
const { logOutController } = require("../../controllers/auth/logOutController");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/signup", asyncWrapper(signUpController));
router.post("/verify", asyncWrapper(verifiedController));
router.post("/login", asyncWrapper(logInController));
router.post("/logout", authMiddleware, asyncWrapper(logOutController));

module.exports = { authRouter: router };
