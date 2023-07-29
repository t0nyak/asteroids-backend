const GetAsteroids = require('./GetAsteroids');
const nasaService = require('../../services/nasa');

module.exports = new GetAsteroids({ nasaService });
