// Updated Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT, DEBUGGING, DEBUG_COLOR, PLAYER_COLOR } from '../constants.mjs';
import { drawPixelLine  } from '../utils.mjs';

export default class Entity {
  constructor({ id, x, y, dx, dy, scale, angle }) {
    this.id    = id;
    this.x     = x;
    this.y     = y;
    this.dx    = -dx;
    this.dy    = dy;
    this.scale = scale;
    this.angle = angle;
  }

  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  render(ctx, model, x, y, angle, scale) {
    const vertexCount = model.length;
	  const sx = [];
	  const sy = [];

    for (let i = 0; i < vertexCount; i++) {
      const vertex = model[i];
      sx[i] = (vertex.x * Math.cos(angle) - vertex.y * Math.sin(angle)) * scale + x;
      sy[i] = (vertex.x * Math.sin(angle) + vertex.y * Math.cos(angle)) * scale + y;
      sx[i] = Math.floor(sx[i]);
      sy[i] = Math.floor(sy[i]);
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

  draw(ctx) {
    // Draw main entity
    const { sx, sy } = this.render(ctx, this.model, this.x, this.y, this.angle, this.scale);
    const minX = Math.min(...sx);
    const maxX = Math.max(...sx);
    const minY = Math.min(...sy);
    const maxY = Math.max(...sy);

    const nearLeft   = minX < 0;
    const nearRight  = maxX > SCREEN_WIDTH;
    const nearTop    = minY < 0;
    const nearBottom = maxY > SCREEN_HEIGHT;

    if (nearLeft)   this.render(ctx, this.model, this.x + SCREEN_WIDTH, this.y, this.angle, this.scale);
    if (nearRight)  this.render(ctx, this.model, this.x - SCREEN_WIDTH, this.y, this.angle, this.scale);
    if (nearTop)    this.render(ctx, this.model, this.x, this.y + SCREEN_HEIGHT, this.angle, this.scale);
    if (nearBottom) this.render(ctx, this.model, this.x, this.y - SCREEN_HEIGHT, this.angle, this.scale);

    if (nearLeft && nearTop)          this.render(ctx, this.model, this.x + SCREEN_WIDTH, this.y + SCREEN_HEIGHT, this.angle, this.scale);
    else if (nearLeft && nearBottom)  this.render(ctx, this.model, this.x + SCREEN_WIDTH, this.y - SCREEN_HEIGHT, this.angle, this.scale);
    else if (nearRight && nearTop)    this.render(ctx, this.model, this.x - SCREEN_WIDTH, this.y + SCREEN_HEIGHT, this.angle, this.scale);
    else if (nearRight && nearBottom) this.render(ctx, this.model, this.x - SCREEN_WIDTH, this.y - SCREEN_HEIGHT, this.angle, this.scale);
  }
}