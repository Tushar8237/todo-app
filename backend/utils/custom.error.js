

// Custom error class for handling errors in the application

export class CustomError extends Error {
    constructor (message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Set the name of the error to the class name

        // Capture the stack trace for debugging
        Error.captureStackTrace(this, this.constructor); 
    }
}