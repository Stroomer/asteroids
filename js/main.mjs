import { BACKGROUND_COLOR, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';
import { P1_UP, P1_DOWN, P1_LEFT, P1_RIGHT, P1_FIRE, P2_UP, P2_DOWN, P2_LEFT, P2_RIGHT, P2_FIRE } from './constants.mjs';
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

  asteroids.push(new Asteroid({ name: 'Asteroid', x: 0, y: 0, dx: 33, dy: 32, size: 16, angle: 0.0 }));

  players.push(new Player({ name: 'Player1', x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2, dx: 10.0, dy: 10.0, size: 32, angle: 0.0, keys: { up: P1_UP, down: P1_DOWN, left: P1_LEFT, right: P1_RIGHT, fire: P1_FIRE } }));
  players.push(new Player({ name: 'Player2', x: SCREEN_WIDTH / 2 - 50, y: SCREEN_HEIGHT / 2 + 50, dx: 0, dy: 0, size: 32, angle: 0.0, keys: { up: P2_UP, down: P2_DOWN, left: P2_LEFT, right: P2_RIGHT, fire: P2_FIRE } }));

  frameTime = { previous: 0, secondsPassed: 0 };
  window.requestAnimationFrame(frame);
}

function frame(time) {
  window.requestAnimationFrame(frame);
  frameTime = { secondsPassed: (time - frameTime.previous) / 1000, previous: time };

  update(frameTime.secondsPassed);
  draw(ctx);
}

function update(dt) {
  for (const asteroid of asteroids) {
    asteroid.update(dt);
  }

  for (const player of players) {
    player.checkInput();
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
