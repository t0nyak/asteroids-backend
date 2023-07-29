const BaseController = require('../BaseController');
const constraint = require('./constraint');
const useCase = require('../../use-cases/get-asteroids');

module.exports = (req, res) => new BaseController(constraint, useCase).run(req, res);
