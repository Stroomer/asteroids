import AsteroidFactory from '../factory/AsteroidFactory.mjs';
import ShipFactory from '../factory/ShipFactory.mjs';

export default class Factory {
  constructor() {
    this.asteroids = new AsteroidFactory();
    this.ships = new ShipFactory();
  }

  createAsteroids(n) {
    return this.asteroids.createRandomAsteroids(n);
  }

  createShip() {
    return this.ships.createShip();
  }
}
