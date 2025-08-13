import AsteroidFactory from "./AsteroidFactory.mjs";
import ShipFactory from "./ShipFactory.mjs";

export default class Factory {
  constructor() {
    this.asteroids = new AsteroidFactory();
    this.ships     = new ShipFactory();  
  }

  createAsteroids(n) {
    return this.asteroids.createRandomAsteroidsList(n);
  }

  createShip() {
    return this.ships.createShip();
  }
}

