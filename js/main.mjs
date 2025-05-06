// import Ship from './classes/Ship.mjs';
import Asteroid from './classes/Asteroid.mjs';
import { BACKGROUND_COLOR, PLAYER_COLOR } from './constants.mjs';
import * as listeners from './listeners.mjs';
import { resize } from './utils.mjs';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
const asteroids = [];

let frameTime;

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  asteroids.push(new Asteroid(20, 20, 8, -60, 16));

  frameTime = { previous: 0, secondsPassed: 0 };
  window.requestAnimationFrame(frame);
}

function frame(time) {
  window.requestAnimationFrame(frame);
  frameTime = { secondsPassed: (time - frameTime.previous) / 1000, previous: time };

  update(frameTime.secondsPassed);
  draw(ctx);
}

function update(dt) {
  for (const asteroid of asteroids) {
    asteroid.update(dt);
  }
}

function draw(ctx) {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const asteroid of asteroids) {
    asteroid.draw(ctx);
  }
}

export { init };
