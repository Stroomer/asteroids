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
    this.ship      = this.factory.createShip(1);
    this.asteroids = this.factory.createAsteroids(5);

    

    // Game Loop
    this.previousTimeMs = 0;
    this.accumulator    = 0;
    this.fixedTimestep  = 1 / 60;
    this.maxUpdates     = 5;

    this.start();
  }

  start() {
    this.createEntities();

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

  createEntities() {}

  update(dt) {
    //console.log('loop ' + dt);
    for (const asteroid of this.asteroids) {
      asteroid.update(dt);
      //console.log(`asteroid [${asteroid.x},${asteroid.y}] type=${asteroid.type}`);
    }
    //console.log(`----------------------`);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = COLOR_ASTEROID;

    for (const asteroid of this.asteroids) {
      asteroid.draw(ctx);
    }
  }
}
