import Keyboard from '../input/keyboard.mjs';
import Factory from '../factory/Factory.mjs';
import { COLOR_ASTEROID } from '../utils/constants.mjs';


export default class Game {
  constructor(ctx) {
    // Canvas Screen
    this.canvas = ctx.canvas;
    this.ctx    = ctx;

    // Game Objects/Entities
    this.factory   = new Factory();
    this.keyboard  = new Keyboard();
    
    this.ships     = [ this.factory.createShip(1) ];
    this.asteroids = [ ...this.factory.createAsteroids(5) ];
    this.bullets   = [];
    
    // Game Loop
    this.previousTimeMs = 0;
    this.accumulator    = 0;
    this.fixedTimestep  = 1 / 60;
    this.maxUpdates     = 5;

    this.start();
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {}

  loop(currentTimeMs) {
    const deltaTimeSec = Math.min((currentTimeMs - this.previousTimeMs) / 1000, 0.25);

    this.previousTimeMs = currentTimeMs;
    this.accumulator += deltaTimeSec;

    let updateCount = 0;
    while (this.accumulator >= this.fixedTimestep && updateCount < this.maxUpdates) {
      this.update(this.fixedTimestep);
      this.accumulator -= this.fixedTimestep;
      updateCount++;
    }

    this.draw(this.ctx);

    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    for (const asteroid of this.asteroids) {
      asteroid.update(dt);
    }
    
    for (const ship of this.ships) {
      ship.update(dt, this.keyboard);
    }

    for (const bullet of this.bullets) {
      bullet.update(dt, this.keyboard);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    for (const asteroid of this.asteroids) {
      asteroid.draw(ctx);
    }

    for (const ship of this.ships) {
      ship.draw(ctx);
    }

    for (const bullet of this.bullets) {
      bullet.draw(ctx);
    }
  }
}
