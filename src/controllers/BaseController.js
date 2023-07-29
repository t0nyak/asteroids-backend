const { validate } = require('../utils/validate');
class BaseController {
  constructor(constraint, useCase) {
    this.constraint = constraint;
    this.useCase = useCase;
  }

  async _runImplementation(req, res) {
    let params;
    if (this.constraint) {
      const { errors, values } = validate(this.constraint(req));
      if (errors.length) {
        return this.validationFailed(res, errors);
      }
      params = values;
    }

    const result = await this.useCase.run(params);

    return this.ok(res, result);
  }

  async run(req, res) {
    try {
      return await this._runImplementation(req, res);
    } catch (err) {
      return this.fail(res, err);
    }
  }

  ok(res, dto) {
    if (dto) {
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  fail(res, error) {
    const { statusCode = 500, payload, msgType, message } = error;

    return res.status(statusCode).json({ message, payload, msgType });
  }

  validationFailed(res, error) {
    const errorPayload = {
      message: 'Validation Error',
      payload: typeof error[Symbol.iterator] === 'function' ? [...error] : error.message,
    };
    return res.status(400).json(errorPayload);
  }
}

module.exports = BaseController;
