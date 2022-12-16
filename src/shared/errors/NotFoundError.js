const ControllerError = require('./ControllerError');

module.exports = class NotFoundError extends ControllerError {
  constructor(errorProps) {
    super({ ...errorProps, statusCode: 404 });
    this.name = this.constructor.name;
  }
};
