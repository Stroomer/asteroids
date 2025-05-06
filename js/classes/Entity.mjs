// Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.mjs';

export default class Entity {
  constructor({ name, x = 0.0, y = 0.0, dx = 1.0, dy = 1.0, size = 16, angle = 0.0 }) {
    this.name  = name;
    this.x     = x;
    this.y     = y;
    this.dx    = dx;
    this.dy    = dy;
    this.size  = size;
    this.angle = angle;
  }

  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  draw(ctx) {    
    this.render(ctx, this.x, this.y); // main draw
    
    if (this.x < this.size)                 this.render(ctx, this.x + SCREEN_WIDTH, this.y);
    if (this.x > SCREEN_WIDTH - this.size)  this.render(ctx, this.x - SCREEN_WIDTH, this.y);
    if (this.y < this.size)                 this.render(ctx, this.x, this.y + SCREEN_HEIGHT);
    if (this.y > SCREEN_HEIGHT - this.size) this.render(ctx, this.x, this.y - SCREEN_HEIGHT);
  }

  render(ctx, x, y) {
    throw new Error('Subclasses must implement render()');
  }
}
