class ItFoodAppErrors extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ItFoodAppErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class VerificationError extends ItFoodAppErrors {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NonExistingParamsError extends ItFoodAppErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends ItFoodAppErrors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class ConflictAuthorizedError extends ItFoodAppErrors {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
class ConflictDataError extends ItFoodAppErrors {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class FileError extends ItFoodAppErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ItFoodAppErrors,
  ValidationError,
  NonExistingParamsError,
  NotAuthorizedError,
  ConflictAuthorizedError,
  ConflictDataError,
  FileError,
  VerificationError,
};

// FileError;
