/**
 * Error Type
 * @readonly
 * @enum {string}
 */
const ErrorType = {
  INFO: 'info',
  ERROR: 'error',
};

module.exports = class ControllerError extends Error {
  constructor({ message = '', statusCode, payload, msgType = ErrorType.ERROR }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.msgType = msgType;
    this.payload = payload;
  }
};
