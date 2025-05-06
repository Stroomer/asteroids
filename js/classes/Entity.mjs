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
    const { x, y, size } = this;
    
    this.render(ctx, x, y); // main draw
    
    if (x < size)                 this.render(ctx, x + SCREEN_WIDTH, y);
    if (x > SCREEN_WIDTH - size)  this.render(ctx, x - SCREEN_WIDTH, y);
    if (y < size)                 this.render(ctx, x, y + SCREEN_HEIGHT);
    if (y > SCREEN_HEIGHT - size) this.render(ctx, x, y - SCREEN_HEIGHT);
  }

  render(ctx, x, y) {
    throw new Error('Subclasses must implement render()');
  }
}
