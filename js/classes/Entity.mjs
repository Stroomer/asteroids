// Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.mjs';

export default class Entity {
  constructor({ name = "", x = 0.0, y = 0.0, dx = 1.0, dy = 1.0, size = 16, angle = 0.0 }) {
    this.name     = name;
    this.x        = x;
    this.y        = y;
    this.dx       = -dx;
    this.dy       = dy;
    this.size     = size;
    this.halfsize = size / 2;
    this.angle    = angle;
  }

  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  draw(ctx) {    
    const { x, y, halfsize } = this;

    // Draw the main entity
    this.render(ctx, x - halfsize, y - halfsize, 'yellow');

    const nearLeft   = x - halfsize < 0;
    const nearRight  = x + halfsize > SCREEN_WIDTH;
    const nearTop    = y - halfsize < 0;
    const nearBottom = y + halfsize > SCREEN_HEIGHT;

    // Horizontal wraps
    if (nearLeft)   this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize);
    if (nearRight)  this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize);

    // Vertical wraps
    if (nearTop)    this.render(ctx, x - halfsize, y - halfsize + SCREEN_HEIGHT);
    if (nearBottom) this.render(ctx, x - halfsize, y - halfsize - SCREEN_HEIGHT);

    // Diagonal corners (only if necessary)
    if (nearLeft && nearTop)          this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize + SCREEN_HEIGHT);
    else if (nearLeft && nearBottom)  this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize - SCREEN_HEIGHT);
    else if (nearRight && nearTop)    this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize + SCREEN_HEIGHT);
    else if (nearRight && nearBottom) this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize - SCREEN_HEIGHT);
  }

  render(ctx, x, y) {
    throw new Error('Subclasses must implement render()');
  }
}