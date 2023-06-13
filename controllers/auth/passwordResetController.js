const { passwordReset } = require("../../services/auth/passwordReset");

const { page } = require("../../services/pages/page");

const passwordResetController = async (req, res) => {
  await passwordReset(req);

  res.send(
    page(
      process.env.NODE_ENV === "production"
        ? process.env.LIVE_PAGE_URL
        : process.env.LOCAL_PAGE_URL,
      "redirectResetPassword"
    )
  );
};

module.exports = { passwordResetController };
