import { BACKGROUND_COLOR, DEBUG, FRAME_INTERVAL, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';
import { KEYBOARD } from './constants.mjs';
import Asteroid from './classes/Asteroid.mjs';
import Player from './classes/Player.mjs';
import * as listeners from './listeners.mjs';
import { FpsCounter, getRandInt, resize } from './utils.mjs';

const canvas     = document.getElementById('screen');
const ctx        = canvas.getContext('2d');
const asteroids  = [];
const players    = [];
const bullets    = [];
const entities   = [];
const fpsCounter = new FpsCounter();

let frameTime;

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  players.push(new Player({ x:SCREEN_WIDTH/2, y:SCREEN_HEIGHT/2, dx:0.0, dy:0.0, scale:8, angle:0.0, keys:KEYBOARD[0], debug:DEBUG, fire }));  

  asteroids.push(new Asteroid({ x:getRandInt(SCREEN_WIDTH/2, SCREEN_HEIGHT/2), y:getRandInt(SCREEN_WIDTH/2, SCREEN_HEIGHT/2), dx: 10.0, dy: -5.0, scale: getRandInt(2, 6), angle: 0.0 }));
  asteroids.push(new Asteroid({ x:getRandInt(SCREEN_WIDTH/2, SCREEN_HEIGHT/2), y:getRandInt(SCREEN_WIDTH/2, SCREEN_HEIGHT/2), dx: 7.0, dy: -12.0, scale: getRandInt(2, 6), angle: 0.0 }));
  asteroids.push(new Asteroid({ x:getRandInt(SCREEN_WIDTH/2, SCREEN_HEIGHT/2), y:getRandInt(SCREEN_WIDTH/2, SCREEN_HEIGHT/2), dx: 4.0, dy: 15.0,  scale: getRandInt(2, 6), angle: 0.0 }));

  

  entities.push(...players, ...asteroids)

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
}

function fire() {
  console.log("fire bullet!");
}

export { init };
