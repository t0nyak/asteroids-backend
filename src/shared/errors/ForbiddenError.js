const ControllerError = require('./ControllerError');

module.exports = class ForbiddenError extends ControllerError {
  constructor(errorProps) {
    super({ ...errorProps, statusCode: 403 });
    this.name = this.constructor.name;
  }
};
