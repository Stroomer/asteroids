import { BACKGROUND_COLOR, FRAME_INTERVAL, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';
import { KEYBOARD } from './constants.mjs';
import * as listeners from './listeners.mjs';
import { resize } from './utils.mjs';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

let frameTime;

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

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
    frame();
  });
}

function update(dt) {}

function draw(ctx) {
  ctx.imageSmoothingEnabled = false;
  ctx.strokeStyle = 'pink';
  ctx.fillStyle = BACKGROUND_COLOR;

  // fill background black
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw pixelated line
  ctx.beginPath();
  ctx.moveTo(20 - 0.5, 75 - 0.5);
  ctx.lineTo(250 - 0.5, 175 - 0.5);
  ctx.stroke();
}

export { init };
