class Asteroid {
  constructor({ id, name, magnitude, hazardous }) {
    (this.id = id), (this.name = name), (this.magnitude = magnitude), (this.hazardous = hazardous);
  }
}

module.exports = Asteroid;
