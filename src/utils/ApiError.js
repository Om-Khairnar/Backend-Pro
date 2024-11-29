class ApiError extends Error {
  constructor(
    stausCode,
    message = "Something Went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = stausCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTraces(this, this.constructor);
    }
  }
}

export { ApiError };
