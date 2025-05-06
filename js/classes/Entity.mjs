// Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.mjs';

export default class Entity {
  constructor(x, y, dx, dy, size = 16) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
  }

  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH) % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  draw(ctx) {
    const x = this.x;
    const y = this.y;
    const s = this.size;

    this.render(ctx, x, y); // main draw

    const nearLeft = x < s;
    const nearRight = x > SCREEN_WIDTH - s;
    const nearTop = y < s;
    const nearBottom = y > SCREEN_HEIGHT - s;

    if (nearLeft) this.render(ctx, x + SCREEN_WIDTH, y);
    if (nearRight) this.render(ctx, x - SCREEN_WIDTH, y);
    if (nearTop) this.render(ctx, x, y + SCREEN_HEIGHT);
    if (nearBottom) this.render(ctx, x, y - SCREEN_HEIGHT);

    if (nearLeft && nearTop) this.render(ctx, x + SCREEN_WIDTH, y + SCREEN_HEIGHT);
    else if (nearLeft && nearBottom) this.render(ctx, x + SCREEN_WIDTH, y - SCREEN_HEIGHT);
    else if (nearRight && nearTop) this.render(ctx, x - SCREEN_WIDTH, y + SCREEN_HEIGHT);
    else if (nearRight && nearBottom) this.render(ctx, x - SCREEN_WIDTH, y - SCREEN_HEIGHT);
  }

  render(ctx, x, y) {
    throw new Error('Subclasses must implement render()');
  }
}
