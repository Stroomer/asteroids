import { PLAYER, ASTEROID, BACKGROUND_COLOR, SCREEN_WIDTH, SCREEN_HEIGHT, MPLAYER_MODE } from './constants.mjs';
import * as listeners from '/js/listeners.mjs';
import { randomInt } from '/js/utils.mjs';
import { resize } from '/js/window.mjs';
import Factory from '/js/tools/Factory.mjs';
import FpsCounter from '/js/tools/FpsCounter.mjs';
import { Point, QuadTree, Rectangle } from './tools/QuadTree.mjs';
import { mouseDown, mouseX, mouseY } from './mouse.mjs';
import { distance, generateClusteredPoints } from './utils.mjs';



const canvas     = document.getElementById('screen');
const ctx        = canvas.getContext('2d');
const entities   = [];
const fpsCounter = new FpsCounter();

//export let quadtree, boundary;

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
  const asteroidCount = 30;

  for (let i = 0; i < asteroidCount; i++) {
    Factory.create(ASTEROID, entities);
  }
    
  
  // boundary = new Rectangle(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
  // quadtree = new QuadTree(boundary, 3, 9);
  
  // const flogPoints = generateClusteredPoints({
  //   numPoints: 100,
  //   numClusters: 4,
  //   range: 320,
  //   clusterRadius: 25
  // });
  
  // console.log(flogPoints);  

  // for (let i = 0; i < flogPoints.length; i++) {
  //   const p = new Point(flogPoints[i].x, flogPoints[i].y);
  //   quadtree.insert(p);
  // }
   
  //console.log(quadtree);
  

  frame();
}

const FIXED_TIMESTEP = 1 / 60; // 60 updates per second
const MAX_UPDATES    = 5;      // Avoid spiral of death

let previousTimeMs = performance.now();
let accumulator = 0;
let qtree;

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
  let i;

  for (i = 0; i < entityCount; i++) {
    const entity = entities[i];
    qtree.insert(new Point(entity.x, entity.y, entity));
    entity.collided = false;
  }

  for (i = 0; i < entityCount; i++) {
    const entity = entities[i];
    const range = new Rectangle(entity.x, entity.y, entity.r, entity.r);
    const others = qtree.query(range);
    for (let p of others) {
      const other = p.userData;
      if (entity === other) continue;
      const d = distance(entity, other);

      // console.log(d);
      // console.log(entity);
      console.log(other);
      

  //     if (d < entity.r + other.r) {
  //       entity.collided = true;
  //       break;
  //     }
    }
  }

  for (i = 0; i < entityCount; i++) {
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

  // if (mouseDown) {
  //   const x = mouseX - 10 + randomInt(0, 20);
  //   const y = mouseY - 10 + randomInt(0, 20);
  //   const p = new Point(x, y);
  //   quadtree.insert(p);

  // }
  
  // console.log(quadtree);
  
  
  // quadtree.show(ctx);
  





  // if (mouseX !== null && mouseY !== null && !mouseDown) {
    // ctx.fillStyle   = 'green';  
    // const range = new Rectangle(mouseX - 32, mouseY - 32, 64, 64);
    // ctx.strokeRect(range.x, range.y, range.w * 2, range.h * 2);
    
    // let points = [];
      
    

    
  // }
}

export { init };
