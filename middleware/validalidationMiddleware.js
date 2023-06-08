const { ValidationError } = require("../helpers/errors");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    console.log("return => req.body:", req.body);
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const { message } = validationResult.error;

      next(new ValidationError(message));
    }
    next();
  };
};

module.exports = { validationMiddleware };
