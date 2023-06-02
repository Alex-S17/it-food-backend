const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const { signUpController } = require("../../controllers/auth/signUpController");
const { logInController } = require("../../controllers/auth/logInController");
const {
  verifiedController,
} = require("../../controllers/auth/verifiedController");

router.post("/signup", asyncWrapper(signUpController));
router.post("/login", asyncWrapper(logInController));
router.get("/verify", asyncWrapper(verifiedController));

module.exports = { authRouter: router };
