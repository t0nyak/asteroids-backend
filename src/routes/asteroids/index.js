const { Router } = require('express');
const getAsteroidsController = require('../../controllers/get-asteroids');

const asteroidRoutes = Router();

asteroidRoutes.get('/', getAsteroidsController);

module.exports = asteroidRoutes;
