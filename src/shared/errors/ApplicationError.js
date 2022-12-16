const ControllerError = require('./ControllerError');

module.exports = class ApplicationError extends ControllerError {
  constructor(errorProps) {
    super({ ...errorProps, statusCode: 500 });
    this.name = this.constructor.name;
  }
};
