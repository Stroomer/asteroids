import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_ASTEROID } from '../utils/constants.mjs';
import Factory from './Factory.mjs';

export default class Game {
  constructor(ctx) {
    // Canvas Screen
    this.canvas = ctx.canvas;
    this.ctx = ctx;

    // Game Objects/Entities
    this.factory = new Factory();
    this.ship = null;
    this.asteroids = [];

    this.a = this.factory.asteroidFactory.asteroids[0];

    // Game Loop
    this.previousTimeMs = 0;
    this.accumulator = 0;
    this.fixedTimestep = 1 / 60;
    this.maxUpdates = 5;

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
    //this.a.update(dt);
  }

  draw(ctx) {
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //this.a.draw(ctx);

    ctx.fillStyle = COLOR_ASTEROID;

    drawPixelLine(ctx, 50, 10, 50, 100);
    drawPixelLine(ctx, 50, 50, 10, 10);
  }
}
