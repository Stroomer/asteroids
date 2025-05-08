import { BACKGROUND_COLOR, FIXED_STEP_FPS, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';
import { KEYBOARD } from './constants.mjs';
import Asteroid from './classes/Asteroid.mjs';
import Player from './classes/Player.mjs';
import * as listeners from './listeners.mjs';
import { resize } from './utils.mjs';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
const asteroids = [];
const players = [];

let frameTime;

function init() {
  resize();

  ctx.fillStyle = BACKGROUND_COLOR;

  //asteroids.push(new Asteroid({ name: 'Asteroid', x: 0, y: 0, dx: 33, dy: 32, size: 16, angle: 0.0 }));

  players.push(new Player({ name: 'Player1', x: 0, y: 0, dx: 80.0, dy: 45.0, size: 32, angle: 0.0, keys: KEYBOARD[0] }));
  //players.push(new Player({ name: 'Player2', x: SCREEN_WIDTH / 2 - 50, y: SCREEN_HEIGHT / 2 + 50, dx: 0, dy: 0, size: 32, angle: 0.0, keys: { up: P2_UP, down: P2_DOWN, left: P2_LEFT, right: P2_RIGHT, fire: P2_FIRE } }));

  // frameTime = { previous: 0, secondsPassed: 0 };
  // window.requestAnimationFrame(frame);
  frame();
}

// function frame(time) {
//   window.requestAnimationFrame(frame);
//   frameTime = { secondsPassed: (time - frameTime.previous) / 1000, previous: time };
//   update(frameTime.secondsPassed);
//   draw(ctx);
// }

let previousTimeMs = 0;
function frame() {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;
    if (deltaTimeMs >= FIXED_STEP_FPS) {
      update(FIXED_STEP_FPS);
      previousTimeMs = currentTimeMs;
    }
    draw(ctx);
    frame();
  });
}

function update(dt) {
  console.log(dt);

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
