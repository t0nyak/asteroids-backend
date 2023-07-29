const fetch = require('node-fetch');

module.exports = class NasaService {
  apiKey = 'DEMO_KEY';
  apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed';

  constructor() {}

  async getAsteroids(startDate, endDate) {
    const response = await fetch(
      `${this.apiUrl}?` +
        new URLSearchParams({ start_date: startDate, end_date: endDate, api_key: this.apiKey })
    );

    return response.json();
  }
};
