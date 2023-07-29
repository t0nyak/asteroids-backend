const AsteroidAdapter = require('./AsteroidAdapter');

module.exports = {
  toResponse: ({ near_earth_objects }) => {
    const asteroids = [];
    Object.values(near_earth_objects).map((value) => {
      asteroids.push(...value.map((val) => AsteroidAdapter.toResponse(val)));
    });
    return asteroids;
  },
};
