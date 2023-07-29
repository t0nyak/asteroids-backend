const { Router } = require('express');
const asteroidRoutes = require('./asteroids');

const routes = Router();

routes.use('/asteroids', asteroidRoutes);

module.exports = routes;
