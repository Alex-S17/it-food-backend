const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const { authMiddleware } = require("../../middleware/authMiddleware");

const {
  joiLoginSchema,
  joiVerifySchema,
  joiSignUpSchema,
  joiForgotPasswordSchema,
} = require("../../models/userModel");

const {
  signUpController,
  logInController,
  logOutController,
  passwordResetController,
  verifiedController,
  forgotPasswordController,
} = require("../../controllers/auth");

const { validationMiddleware } = require("../../middleware");

router.post(
  "/signup",
  validationMiddleware(joiSignUpSchema),
  asyncWrapper(signUpController)
);
router.post(
  "/verify",
  validationMiddleware(joiVerifySchema),
  asyncWrapper(verifiedController)
);
router.post(
  "/login",
  validationMiddleware(joiLoginSchema),
  asyncWrapper(logInController)
);
router.get(
  "/forgotPassword/:verificationToken",
  asyncWrapper(passwordResetController)
);

router.post(
  "/forgotPassword/",
  validationMiddleware(joiForgotPasswordSchema),
  asyncWrapper(forgotPasswordController)
);

router.post("/logout", authMiddleware, asyncWrapper(logOutController));

module.exports = { authRouter: router };
