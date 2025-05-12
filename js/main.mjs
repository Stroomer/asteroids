import { BACKGROUND_COLOR, DEBUG, FRAME_INTERVAL, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';
import { KEYBOARD } from './constants.mjs';
import Asteroid from './classes/Asteroid.mjs';
import Player from './classes/Player.mjs';
import * as listeners from './listeners.mjs';
import { FpsCounter, resize } from './utils.mjs';

const canvas     = document.getElementById('screen');
const ctx        = canvas.getContext('2d');
const asteroids  = [];
const players    = [];
const entities   = [];
const fpsCounter = new FpsCounter();

let frameTime;

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  //asteroids.push(new Asteroid({ name: 'Asteroid', x: 0, y: 0, dx: 33, dy: 32, size: 16, angle: 0.0 }));

  const name = 'Player1';
  const x = SCREEN_WIDTH / 2;
  const y = SCREEN_HEIGHT / 2;
  const dx = 0.0;
  const dy = 0.0;
  const scale = 8;
  const angle = 0.0;
  const keys = KEYBOARD[0];
  const debug = DEBUG;

  players.push(new Player({ name, x, y, dx, dy, scale, angle, keys, debug }));


  entities.push(...players)
  entities.push(...asteroids);

  frame();
}

const FIXED_TIMESTEP = 1 / 60; // 60 updates per second
const MAX_UPDATES    = 5;      // Avoid spiral of death

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
  const entityCount = entities.length;

  for (let i = 0; i < entityCount; i++) {
    entities[i].update(dt);
  }
}

function draw(ctx) {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const entityCount = entities.length;

  for (let i = 0; i < entityCount; i++) {
    entities[i].draw(ctx);
  }

  // for (const asteroid of asteroids) {
  //   asteroid.draw(ctx);
  // }

  // for (const player of players) {
  //   player.draw(ctx);
  // }
}

export { init };
