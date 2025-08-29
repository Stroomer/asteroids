import { getScreen } from './screen/screen.mjs';
import Keyboard from './input/Keyboard.mjs';
import Factory from './core/Factory.mjs';

const ctx       = getScreen();
const factory   = new Factory();
const keyboard  = new Keyboard();

const asteroids = factory.createAsteroidCollection(10,32);
const ships     = [ factory.createShip() ];
const bullets   = [];

let previousTimeMs = 0;
let accumulator = 0;
let fixedTimestep = 1 / 60;
let maxUpdates = 5;

start();

function start() {
  requestAnimationFrame(loop);
}

function stop() {}

function loop(currentTimeMs) {
  const deltaTimeSec = Math.min((currentTimeMs - previousTimeMs) / 1000, 0.25);

  previousTimeMs = currentTimeMs;
  accumulator += deltaTimeSec;

  let updateCount = 0;
  while (accumulator >= fixedTimestep && updateCount < maxUpdates) {
    update(fixedTimestep);
    accumulator -= fixedTimestep;
    updateCount++;
  }

  draw(ctx);

  requestAnimationFrame(loop);
}

function update(dt) {
  for (const asteroid of asteroids) {
    asteroid.update(dt);
  }

  for (const ship of ships) {
    ship.update(dt, keyboard);
  }

  for (const bullet of bullets) {
    bullet.update(dt, keyboard);
  }

}

function draw(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (const asteroid of asteroids) {
    asteroid.draw(ctx);
  }

  for (const ship of ships) {
    ship.draw(ctx);
  }

  for (const bullet of bullets) {
    bullet.draw(ctx);
  }
}

export { factory, bullets };