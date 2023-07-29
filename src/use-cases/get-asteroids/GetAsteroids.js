const AsteroidsAdapter = require('../../infrastructure/adapters/AsteroidsAdapter');

module.exports = class GetAsteroids {
  constructor({ nasaService }) {
    this.service = nasaService;
  }

  async run({ startDate, endDate }) {
    const serviceResponse = await this.service.getAsteroids(startDate, endDate);

    const asteroids = AsteroidsAdapter.toResponse(serviceResponse);

    return asteroids.sort((a, b) => (a.name < b.name ? -1 : 1));
  }
};
