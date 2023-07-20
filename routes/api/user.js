const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const { authMiddleware } = require("../../middleware/authMiddleware");
const {
  changeUserDataController,
} = require("../../controllers/user/changeUserDataController");

const {
  userFavoriteDishesController,
} = require("../../controllers/user/userFavoriteDishesController");

const {
  addToFavoriteDishesController,
} = require("../../controllers/user/addToFavoriteDishesController");

const {
  deleteFromFavoriteDishesController,
} = require("../../controllers/user/deleteFromFavoriteDishesController");

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
router.get(
  "/current/favorite",
  authMiddleware,
  asyncWrapper(userFavoriteDishesController)
);
router.post(
  "/current/add-to-favorite",
  authMiddleware,
  asyncWrapper(addToFavoriteDishesController)
);
router.patch(
  "/current/delete-from-favorite",
  authMiddleware,
  asyncWrapper(deleteFromFavoriteDishesController)
);

module.exports = { userRouter: router };
