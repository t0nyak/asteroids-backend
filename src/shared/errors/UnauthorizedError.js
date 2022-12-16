const ControllerError = require('./ControllerError');

module.exports = class UnauthorizedError extends ControllerError {
  constructor(errorProps) {
    super({ ...errorProps, statusCode: 401 });
    this.name = this.constructor.name;
  }
};
