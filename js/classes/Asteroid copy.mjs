import { ASTEROID_COLOR } from '../constants.mjs';
import Entity from './Entity.mjs';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.mjs';

export default class Asteroid {
  constructor(x, y, dx, dy, size = 16) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = parseInt(size);
    this.ax = 0;
    this.ay = 0;
    this.vx = 0;
    this.vy = 0;
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    this.wx += this.dx * dt;
    this.wy += this.dy * dt;

    if (this.x < 0.0) {
      this.wx = this.x;
      this.x += SCREEN_WIDTH;
      // this.wx = this.x - SCREEN_WIDTH;
    } else if (this.x >= SCREEN_WIDTH) {
      this.wx = this.x;
      this.x -= SCREEN_WIDTH;
      // this.wx = this.x + SCREEN_WIDTH;
    }

    if (this.y < 0.0) {
      this.wy = this.y;
      this.y += SCREEN_HEIGHT;
      // this.wy = this.y - SCREEN_HEIGHT;
    } else if (this.y >= SCREEN_HEIGHT) {
      this.wy = this.y;
      this.y -= SCREEN_HEIGHT;
      // this.wy = this.y + SCREEN_HEIGHT;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);

    ctx.fillStyle = 'cyan';
    ctx.fillRect(Math.floor(this.wx), Math.floor(this.wy), this.size, this.size);
  }
}
