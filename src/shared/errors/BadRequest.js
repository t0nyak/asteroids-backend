const ControllerError = require('./ControllerError');

module.exports = class BadRequestError extends ControllerError {
  constructor(errorProps) {
    super({ ...errorProps, statusCode: 400 });
    this.name = this.constructor.name;
  }
};
