const Asteroid = require('../../models/asteroid/Asteroid');

module.exports = {
  toResponse: ({ id, name, absolute_magnitude_h, is_potentially_hazardous_asteroid }) => {
    return new Asteroid({
      id,
      name,
      magnitude: absolute_magnitude_h,
      hazardous: is_potentially_hazardous_asteroid,
    });
  },
};
