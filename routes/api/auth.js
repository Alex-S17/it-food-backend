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
const {
  forgotPasswordController,
} = require("../../controllers/auth/forgotPasswordController");

const {
  passwordResetController,
} = require("../../controllers/auth/passwordResetController");

const {
  validationMiddleware,
} = require("../../middleware/validalidationMiddleware");
const {
  joiLoginSchema,
  joiVerifySchema,
  joiSignUpSchema,
  joiForgotPasswordSchema,
} = require("../../models/userModel");

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
