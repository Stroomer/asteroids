import { PLAYER, ASTEROID, BACKGROUND_COLOR, SCREEN_WIDTH, SCREEN_HEIGHT, MPLAYER_MODE } from './constants.mjs';
import * as listeners from '/js/listeners.mjs';
import { randomInt } from '/js/utils.mjs';
import { resize } from '/js/window.mjs';
import FpsCounter from '/js/tools/FpsCounter.mjs';
import { Point, QuadTree, Rectangle } from './tools/QuadTree.mjs';
import { mouseDown, mouseX, mouseY } from './mouse.mjs';
import { getDistance, getDistanceSquared } from './utils.mjs';
import Asteroid from '../js/objects/Asteroid.mjs';


const canvas     = document.getElementById('screen');
const ctx        = canvas.getContext('2d');
const entities   = [];
const fpsCounter = new FpsCounter();


function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;
  
  // Create Players
  // const mplayer     = MPLAYER_MODE;
  // const playerCount = !mplayer ? 1 : 2;

  // for (let i = 0; i < playerCount; i++) {
  //   Factory.create(PLAYER, entities, { name:`Player${i+1}`, mplayer });
  // } 

  // Create Asteroids
  const asteroidCount = 2;

  for (let i = 0; i < asteroidCount; i++) {
    entities.push(new Asteroid());
  }
    
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
  const boundary    = new Rectangle(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
  const qtree       = new QuadTree(boundary, 4);
  const entityCount = entities.length;
  let i,o;

  for (i = 0; i < entityCount; i++) {
    const entity = entities[i];
    qtree.insert(new Point(entity.x, entity.y, entity));
    entity.collided = false;
  }

  for (i = 0; i < entityCount; i++) {
    const entity = entities[i];
    const range = new Rectangle(entity.x, entity.y, entity.r, entity.r);
    const others = qtree.query(range);
    const othersCount = others.length;
    
    othersLoop: for (o = 0; o < othersCount; o++) {
      const other = others[o].userData;
      if (entity.uid === other.uid) continue othersLoop;

      const d = getDistance(entity.x, entity.y, other.x, other.y);
      
      console.log(`distance:${d}  r:${entity.r} r:${other.r}`);

      if (d < entity.r + other.r) {
        entity.collided = true;
        other.collided = true;  
        break othersLoop;
      }    
    }
  }

  if (mouseX !== null && mouseY !== null) {
    entities[0].x = mouseX;  
    entities[0].y = mouseY;
  }
  
  for (i = 0; i < entityCount; i++) {
    entities[i].update(dt);
  }
}


function draw(ctx) {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  const entityCount = entities.length;

  for (let i = 0; i < entityCount; i++) {
    entities[i].draw(ctx);
  }

  
}

export { init };
