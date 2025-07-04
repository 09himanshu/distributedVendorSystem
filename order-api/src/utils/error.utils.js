

export class AppError extends Error {
  constructor(
    status,
    statusCode,
    message,
    isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}


export class BadRequestError extends AppError {
  constructor(message) {
    super(false, 400, message)
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(false, 404, message)
  }
}

export class InternalServerError extends AppError {
  constructor(message) {
    super(false, 500, message);
  }
}