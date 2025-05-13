import { BACKGROUND_COLOR, DEBUG, FRAME_INTERVAL, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';
import { KEYBOARD } from './constants.mjs';
import Asteroid from './classes/Asteroid.mjs';
import Player from './classes/Player.mjs';
import * as listeners from './listeners.mjs';
import { FpsCounter, getRandInt, getId, resize } from './utils.mjs';
import Bullet from './classes/Bullet.mjs';

const canvas     = document.getElementById('screen');
const ctx        = canvas.getContext('2d');
const entities   = [];
const fpsCounter = new FpsCounter();

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  createPlayers(1);
  createAsteroids(3);

  
   


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

function createPlayers(playerCount) {
  entities.push( new Player( { id:getId(), x:SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2, dx: 0.0, dy: 0.0, scale: 8, angle: 0.0, keys: KEYBOARD[0], debug: DEBUG }) );
}

function createAsteroids(asteroidCount) {
  for (let i = 0; i < asteroidCount; i++) {
    const id    = getId();
    const x     = getRandInt(0, SCREEN_WIDTH);
    const y     = getRandInt(0, SCREEN_HEIGHT);
    const scale = getRandInt(2, 6);
    const dx    = 5.0;
    const dy    = 10.0;
    const angle = 0.0;

    entities.push(new Asteroid({ id, x, y, dx, dy, scale, angle }));  
  }
}

function createBullet({ id, x, y, dx, dy, scale, angle }) {

  //console.log('bullet', id, x, y, dx, dy, scale, angle);
  

  entities.push( new Bullet({ id, x, y, dx, dy, scale, angle }) );  
}

export { init, createBullet };
