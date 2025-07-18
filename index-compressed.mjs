import { randomAsteroidDirection } from './js/utils.mjs';

const MPLAYER_MODE = false;
const MAX_FPS = 60;
const FRAME_INTERVAL = 1 / MAX_FPS;
const PI = Math.PI;

const FRICTION = 0.99;
const PLAYER_MAXSPEED = 80.0;
const PLAYER_ROT_SPD = 5.0;
const BULLET_MAXSPEED = 120.0;

const PLAYER = 1;
const ASTEROID = 2;
const BULLET = 3;

const BACKGROUND_COLOR = 'black';
const PLAYER_COLOR = 'cyan';
const ASTEROID_COLOR = 'white';
const BULLET_COLOR = 'red';

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 320;
const SCREEN_MARGIN = 20;

const CURSOR_UP = 38;
const CURSOR_DOWN = 40;
const CURSOR_LEFT = 37;
const CURSOR_RIGHT = 39;
const CTRL_RIGHT = 17;

const KEY_W = 6;
const KEY_S = 7;
const KEY_A = 8;
const KEY_D = 9;
const CTRL_LEFT = -17;

const SPACE = 32;
const ENTER = 13;
const KEYBOARD = [
  { up: CURSOR_UP, down: CURSOR_DOWN, left: CURSOR_LEFT, right: CURSOR_RIGHT, fire: SPACE },
  { up: KEY_W, down: KEY_S, left: KEY_A, right: KEY_D, fire: CTRL_LEFT },
];

const keys = new Set();
const player1 = KEYBOARD[0];
const player2 = KEYBOARD[1];

let mouseDown = false;
let mouseX = null;
let mouseY = null;

let uid = 0;

// At top level (once), create reusable bounding box objects
const reusableBBox = { x: 0, y: 0, w: 0, h: 0 };

function keydown(event) {
  event.preventDefault();
  switch (event.code) {
    case 'ArrowUp':
      keys.add(player1.up);
      break;
    case 'ArrowDown':
      keys.add(player1.down);
      break;
    case 'ArrowLeft':
      keys.add(player1.left);
      break;
    case 'ArrowRight':
      keys.add(player1.right);
      break;
    case 'Space':
      keys.add(player1.fire);
      break;
  }
}

function keyup(event) {
  event.preventDefault();
  switch (event.code) {
    case 'ArrowUp':
      keys.delete(player1.up);
      break;
    case 'ArrowDown':
      keys.delete(player1.down);
      break;
    case 'ArrowLeft':
      keys.delete(player1.left);
      break;
    case 'ArrowRight':
      keys.delete(player1.right);
      break;
    case 'Space':
      keys.delete(player1.fire);
      break;
  }
}

function isKeyDown(key) {
  return keys.has(key) ? true : false;
}

function isKeyUp(key) {
  return keys.has(key) ? false : true;
}

function mousemove(event) {
  setMousePosition(event);
  //console.log(mouseX, mouseY);
}

function mousedown(event) {
  setMousePosition(event);
  mouseDown = true;
}

function mouseup(event) {
  setMousePosition(event);
  mouseDown = false;
}

function mouseleave() {
  mouseDown = false;
  mouseX = null;
  mouseY = null;
}

function setMousePosition(event) {
  const canvas = event.target;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = Math.floor((event.clientX - rect.left) * scaleX);
  const y = Math.floor((event.clientY - rect.top) * scaleY);

  mouseX = x < 0 || x > SCREEN_WIDTH ? null : x;
  mouseY = y < 0 || y > SCREEN_HEIGHT ? null : y;
}

function getUid() {
  return ++uid;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDistanceSquared(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function polygonsIntersect(polygonA, polygonB) {
  const polygons = [polygonA, polygonB];
  let i, j;

  for (let p = 0; p < polygons.length; p++) {
    const polygon = polygons[p];

    for (i = 0; i < polygon.length; i++) {
      const current = polygon[i];
      const next = polygon[(i + 1) % polygon.length];
      const edge = { x: next.x - current.x, y: next.y - current.y };
      const axis = { x: -edge.y, y: edge.x }; // Normal vector

      let minA = Infinity,
        maxA = -Infinity;
      for (j = 0; j < polygonA.length; j++) {
        const proj = polygonA[j].x * axis.x + polygonA[j].y * axis.y;
        minA = Math.min(minA, proj);
        maxA = Math.max(maxA, proj);
      }

      let minB = Infinity,
        maxB = -Infinity;
      for (j = 0; j < polygonB.length; j++) {
        const proj = polygonB[j].x * axis.x + polygonB[j].y * axis.y;
        minB = Math.min(minB, proj);
        maxB = Math.max(maxB, proj);
      }

      if (maxA < minB || maxB < minA) return false; // Separating axis found, no collision
    }
  }
  return true; // No separating axis found, polygons intersect
}

function radiansToDegrees(radians) {
  return radians * (180 / PI);
}

function degreesToRadians(degrees) {
  return degrees * (PI / 180);
}

function drawPixelLine(ctx, x0, y0, x1, y1) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    ctx.fillRect(x0, y0, 1, 1);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

class Entity {
  constructor() {
    this.uid = getUid();
    this.speed = 0;
  }

  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH) % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  render(ctx, model, x, y, angle, scale) {
    const vertexCount = model.length;
    const sx = [];
    const sy = [];

    for (let i = 0; i < vertexCount; i++) {
      const vertex = model[i];
      sx[i] = (vertex.x * Math.cos(angle) - vertex.y * Math.sin(angle)) * scale;
      sy[i] = (vertex.x * Math.sin(angle) + vertex.y * Math.cos(angle)) * scale;
      sx[i] = Math.floor(sx[i] + x);
      sy[i] = Math.floor(sy[i] + y);
    }

    for (let i = 0; i < vertexCount; i++) {
      const x0 = sx[i];
      const y0 = sy[i];
      const x1 = sx[(i + 1) % vertexCount];
      const y1 = sy[(i + 1) % vertexCount];

      drawPixelLine(ctx, x0, y0, x1, y1);
    }

    return { sx, sy }; // Return for bounding box
  }

  drawCollisionCircle(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = this.collided ? 'red' : 'green';
    ctx.beginPath();
    ctx.arc(x, y, this.r, 0, PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // distanceBetweenAsteroids(ctx) {
  //   ctx.save();
  //   ctx.strokeStyle = 'blue';
  //   ctx.beginPath();
  //   ctx.moveTo(entities[0].x, entities[0].y);
  //   ctx.lineTo(entities[1].x, entities[1].y);
  //   ctx.stroke();
  //   ctx.restore();
  // }

  draw(ctx) {
    this.drawCollisionCircle(ctx, this.x, this.y);

    // // Draw main model
    // const { sx, sy } = this.render(ctx, this.model, this.x, this.y, this.angle, this.scale);

    // const minX = Math.min(...sx);
    // const maxX = Math.max(...sx);
    // const minY = Math.min(...sy);
    // const maxY = Math.max(...sy);

    // const nearLeft = minX < 0;
    // const nearRight = maxX > SCREEN_WIDTH;
    // const nearTop = minY < 0;
    // const nearBottom = maxY > SCREEN_HEIGHT;

    // const offsets = [];

    // if (nearLeft) offsets.push([SCREEN_WIDTH, 0]);
    // if (nearRight) offsets.push([-SCREEN_WIDTH, 0]);
    // if (nearTop) offsets.push([0, SCREEN_HEIGHT]);
    // if (nearBottom) offsets.push([0, -SCREEN_HEIGHT]);

    // if (nearLeft && nearTop) offsets.push([SCREEN_WIDTH, SCREEN_HEIGHT]);
    // if (nearLeft && nearBottom) offsets.push([SCREEN_WIDTH, -SCREEN_HEIGHT]);
    // if (nearRight && nearTop) offsets.push([-SCREEN_WIDTH, SCREEN_HEIGHT]);
    // if (nearRight && nearBottom) offsets.push([-SCREEN_WIDTH, -SCREEN_HEIGHT]);

    // for (const [dx, dy] of offsets) {
    //   const wrapX = this.x + dx;
    //   const wrapY = this.y + dy;
    //   this.render(ctx, this.model, wrapX, wrapY, this.angle, this.scale);
    //   this.drawCollisionCircle(ctx, wrapX, wrapY);
    // }

    //this.distanceBetweenAsteroids(ctx);
  }
}

class Asteroid extends Entity {
  constructor({ x, y, r }) {
    super();

    this.x = randomInt(0, SCREEN_WIDTH / 2);
    this.y = randomInt(0, SCREEN_HEIGHT / 2);
    this.dx = randomAsteroidDirection(10);
    this.dy = randomAsteroidDirection(10);

    this.vertexCount = 30;
    this.scale = 1;
    this.angle = 0.0;
    this.r = r || 8;
    this.model = this.generateModel(this.vertexCount, this.r);
    this.collided = false;
  }

  getWrappedPositions() {
    const positions = [{ x: this.x, y: this.y }]; // original position

    const wrapOffsets = [
      [SCREEN_WIDTH, 0],
      [-SCREEN_WIDTH, 0],
      [0, SCREEN_HEIGHT],
      [0, -SCREEN_HEIGHT],
      [SCREEN_WIDTH, SCREEN_HEIGHT],
      [SCREEN_WIDTH, -SCREEN_HEIGHT],
      [-SCREEN_WIDTH, SCREEN_HEIGHT],
      [-SCREEN_WIDTH, -SCREEN_HEIGHT],
    ];

    for (const [dx, dy] of wrapOffsets) {
      positions.push({ x: this.x + dx, y: this.y + dy });
    }

    return positions;
  }

  generateModel(vertexCount, r) {
    const points = [];
    for (let i = 0; i < vertexCount; i++) {
      const radiusVariation = Math.random() * 0.2 - 0.99;
      const radius = r * radiusVariation;
      const angle = (i / vertexCount) * PI * 2;
      const x = radius * Math.sin(angle);
      const y = radius * Math.cos(angle);
      points.push({ x, y });
    }
    return points;
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = ASTEROID_COLOR;
    super.draw(ctx);
  }
}

class Bullet extends Entity {
  constructor({ x, y, dx, dy, angle, offset }) {
    super();

    this.type = BULLET;
    this.dx = dx + BULLET_MAXSPEED * Math.sin(angle);
    this.dy = dy + -BULLET_MAXSPEED * Math.cos(angle);
    this.x = x + Math.sin(angle) * offset;
    this.y = y - Math.cos(angle) * offset;
    this.scale = 1;
    this.angle = angle;
    this.model = [{ x: 0, y: 0 }];
    this.r = 1; //this.maxRadius() * this.scale;
    this.collided = false;
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
  }

  draw(ctx) {
    ctx.fillStyle = BULLET_COLOR;
    super.draw(ctx);
  }
}

window.addEventListener('load', init);
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
window.addEventListener('resize', resize);

document.getElementById('screen').addEventListener('mousemove', mousemove);
document.getElementById('screen').addEventListener('mousedown', mousedown);
document.getElementById('screen').addEventListener('mouseup', mouseup);
document.getElementById('screen').addEventListener('mouseleave', mouseleave);

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
const entities = [];
const asteroids = [];
const fpsCounter = new FpsCounter();

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  // Create Asteroids
  const asteroidCount = 100;
  for (let i = 0; i < asteroidCount; i++) {
    entities.push(new Asteroid({ r: 2 }));
  }

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
    deltaTimeSec = Math.min(deltaTimeSec, 0.25); // Avoid spiral of death on huge frame delays
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

let qtree;

function update(dt) {
  const boundary = new Rectangle(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
  qtree = new QuadTree(boundary);

  // Insert all entities into the QuadTree
  for (const entity of entities) {
    qtree.insert(new Point(entity.x, entity.y, entity));
    entity.collided = false;
  }

  // Update all entities
  for (const entity of entities) {
    entity.update(dt);
  }
}

function draw(ctx) {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  for (const entity of entities) {
    entity.draw(ctx);
  }
  qtree.show(ctx);
}

// Check collisions
// for (const entity of entities) {
//   const range = new Rectangle(entity.x, entity.y, entity.r * 2, entity.r * 2);
//   const possible = qtree.query(range);

//   for (const p of possible) {
//     const other = p.data;

//     if (entity.uid !== other.uid) {
//       const dx = entity.x - p.x;
//       const dy = entity.y - p.y;
//       const dist = Math.hypot(dx, dy);

//       if (dist < entity.r + other.r) {
//         entity.collided = true;
//         other.collided = true;
//       }
//     }
//   }
// }

// Allow dragging first entity with the mouse
// if (mouseX !== null && mouseY !== null) {
//   entities[0].x = mouseX;
//   entities[0].y = mouseY;
// }

//     // Use a larger query rectangle to avoid missing edge collisions
//     const queryRange = new Rectangle(entity.x, entity.y, entity.r * 2, entity.r * 2);
//     const possibleColliders = qtree.query(queryRange);
//     for (let j = 0; j < possibleColliders.length; j++) {
//         const other = possibleColliders[j].userData;
//         if (entity.uid === other.uid) continue;
//         const distSq = getDistanceSquared(entity.x, entity.y, other.x, other.y);
//         const radiusSq = (entity.r + other.r) * (entity.r + other.r);
//         if (distSq <= radiusSq) {
//             entity.collided = true;
//             other.collided = true;
//             break; // Assuming one collision is enough
//         }
//     }

//checkAsteroidCollisions(entities.filter((e) => e instanceof Asteroid));
