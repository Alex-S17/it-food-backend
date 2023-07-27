const { authMiddleware } = require("./authMiddleware");
const { orderMiddleware } = require("./orderMiddleware");
const { uploadCloud } = require("./uploadMiddleware");
const { validationMiddleware } = require("./validalidationMiddleware");

module.exports = {
  authMiddleware,
  orderMiddleware,
  uploadCloud,
  validationMiddleware,
};
