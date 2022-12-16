const logger = require('../config/log').module('base-controller');

class BaseController {
  // eslint-disable-next-line no-empty-function, no-unused-vars
  async _runImplementation(req, res) {}

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
    logger.error(error.message);
    const { statusCode = 500, payload, msgType, message } = error;

    return res.status(statusCode).json({ message, payload, msgType });
  }
}

module.exports = BaseController;
