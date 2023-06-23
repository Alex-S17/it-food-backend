const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  changeUserDataController,
} = require("../../controllers/user/changeUserDataController");
const { uploadCloud } = require("../../middleware/uploadMiddleware");
const {
  currentUserController,
} = require("../../controllers/user/currentUserController");

// const {
//   validationMiddleware,
// } = require("../../middleware/validalidationMiddleware");
// const { joiChangeUserDataSchema } = require("../../models/userModel");

router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch(
  "/changeUserData",
  authMiddleware,
  uploadCloud.single("avatarImage"),
  // validationMiddleware(joiChangeUserDataSchema),
  asyncWrapper(changeUserDataController)
);

module.exports = { userRouter: router };
