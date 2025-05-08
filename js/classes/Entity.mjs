// Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.mjs';

export default class Entity {
  constructor({ name = "", x = 0.0, y = 0.0, dx = 1.0, dy = 1.0, size = 16, angle = 0.0 }) {
    this.name     = name;
    this.x        = x;
    this.y        = y;
    this.dx       = dx;
    this.dy       = dy;
    this.size     = size;
    this.halfsize = size / 2;
    this.angle    = angle;
    this.px       = x + this.halfsize; 
    this.py       = y + this.halfsize; 
  }

  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    this.px = this.x + this.halfsize; 
    this.py = this.y + this.halfsize; 
  }

  draw(ctx) {    
    // main draw
    this.render(ctx, this.x, this.y);
    // wrap draw
    if (this.x < this.size)                 this.render(ctx, this.x + SCREEN_WIDTH, this.y);  // Near left
    if (this.x > SCREEN_WIDTH - this.size)  this.render(ctx, this.x - SCREEN_WIDTH, this.y);  // Near right
    if (this.y < this.size)                 this.render(ctx, this.x, this.y + SCREEN_HEIGHT); // Near top
    if (this.y > SCREEN_HEIGHT - this.size) this.render(ctx, this.x, this.y - SCREEN_HEIGHT); // Near bottom
  }

  render(ctx, x, y) {
    throw new Error('Subclasses must implement render()');
  }
}
