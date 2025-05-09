import { BACKGROUND_COLOR, FRAME_INTERVAL, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';
import { KEYBOARD } from './constants.mjs';
import Asteroid from './classes/Asteroid.mjs';
import Player from './classes/Player.mjs';
import * as listeners from './listeners.mjs';
import { FpsCounter, resize } from './utils.mjs';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
const asteroids = [];
const players = [];
const fpsCounter = new FpsCounter();

let frameTime;

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  //asteroids.push(new Asteroid({ name: 'Asteroid', x: 0, y: 0, dx: 33, dy: 32, size: 16, angle: 0.0 }));

  players.push(new Player({ name: 'Player1', x: SCREEN_WIDTH, y: 0, dx: 0.0, dy: 10.0, size: 40, angle: 0.0, keys: KEYBOARD[0] }));

  frame();
}

const FIXED_TIMESTEP = 1 / 60; // 60 updates per second
const MAX_UPDATES = 5; // Avoid spiral of death

let previousTimeMs = performance.now();
let accumulator = 0;

function frame() {
  requestAnimationFrame((currentTimeMs) => {
    let deltaTimeSec = (currentTimeMs - previousTimeMs) / 1000;
    previousTimeMs = currentTimeMs;

    // Avoid spiral of death on huge frame delays
    deltaTimeSec = Math.min(deltaTimeSec, 0.25);

    accumulator += deltaTimeSec;

    let updateCount = 0;
    while (accumulator >= FIXED_TIMESTEP && updateCount < MAX_UPDATES) {
      update(FIXED_TIMESTEP); // Step game forward by fixed amount
      accumulator -= FIXED_TIMESTEP;
      updateCount++;
    }

    draw(ctx); // Use latest state to render
    fpsCounter.update(deltaTimeSec);
    fpsCounter.draw(ctx);

    frame();
  });
}

function update(dt) {
  for (const asteroid of asteroids) {
    asteroid.update(dt);
  }

  for (const player of players) {
    player.update(dt);
  }
}

function draw(ctx) {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const asteroid of asteroids) {
    asteroid.draw(ctx);
  }

  for (const player of players) {
    player.draw(ctx);
  }
}

export { init };
