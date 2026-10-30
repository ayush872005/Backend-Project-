class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong", // CHANGED: = instead of :
        errors = [],
        stack = "" // CHANGED: statck -> stack
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError }; // CHANGED: moved outside the class