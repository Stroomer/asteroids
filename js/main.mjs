import { PLAYER, ASTEROID, BACKGROUND_COLOR, BULLET, SCREEN_WIDTH, SCREEN_HEIGHT } from './constants.mjs';
import { KEYBOARD } from './constants.mjs';
import * as listeners from './listeners.mjs';
import { FpsCounter, randomInt, getId } from './utils.mjs';
import { resize } from './window.mjs';
import Player from './classes/Player.mjs';
import Asteroid from './classes/Asteroid.mjs';
import Bullet from './classes/Bullet.mjs';
import Factory from './classes/Factory.mjs';
import { Point, QuadTree, Rectangle } from './classes/QuadTree.mjs';

const canvas     = document.getElementById('screen');
const ctx        = canvas.getContext('2d');
const entities   = [];
const fpsCounter = new FpsCounter();

let quadtree, boundary;

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  Factory.CREATE(entities, PLAYER, 1);
  // Factory.CREATE(entities, ASTEROID, 60);

  boundary = new Rectangle(SCREEN_WIDTH/2, SCREEN_WIDTH/2, SCREEN_WIDTH/2, SCREEN_WIDTH/2);
  quadtree = new QuadTree(boundary, 4);
  console.log(quadtree);

  for (let i = 0; i < 4; i++) {
    const p = new Point(randomInt(0, SCREEN_WIDTH), randomInt(0, SCREEN_HEIGHT));
    quadtree.insert(p);
  }
  
  quadtree.show(ctx);
  
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
    deltaTimeSec = Math.min(deltaTimeSec, 0.25);  // Avoid spiral of death on huge frame delays
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

export { init };
