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
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    this.x = (this.x + SCREEN_WIDTH) % SCREEN_WIDTH;
    this.y = (this.y + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  draw(ctx) {
    // Meant to be overridden
  }

  drawWrapped(ctx, drawFunc) {
    const x = this.x;
    const y = this.y;
    const w = this.size;
    const h = this.size;

    // Always draw original position
    drawFunc(x, y);

    const nearLeft = x < w;
    const nearRight = x > SCREEN_WIDTH - w;
    const nearTop = y < h;
    const nearBottom = y > SCREEN_HEIGHT - h;

    // Draw wrapped copies only when needed
    if (nearLeft) drawFunc(x + SCREEN_WIDTH, y);
    if (nearRight) drawFunc(x - SCREEN_WIDTH, y);
    if (nearTop) drawFunc(x, y + SCREEN_HEIGHT);
    if (nearBottom) drawFunc(x, y - SCREEN_HEIGHT);

    // Corners (at most 1 more draw)
    if (nearLeft && nearTop) drawFunc(x + SCREEN_WIDTH, y + SCREEN_HEIGHT);
    if (nearLeft && nearBottom) drawFunc(x + SCREEN_WIDTH, y - SCREEN_HEIGHT);
    if (nearRight && nearTop) drawFunc(x - SCREEN_WIDTH, y + SCREEN_HEIGHT);
    if (nearRight && nearBottom) drawFunc(x - SCREEN_WIDTH, y - SCREEN_HEIGHT);
  }
}

// // Entity.mjs
// export default class Entity {
//   constructor(x, y, dx, dy, size = 16) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.size = size;
//   }

//   update(dt) {
//     this.x += this.dx * dt;
//     this.y += this.dy * dt;

//     // Wrap position like a torus
//     this.x = (this.x + SCREEN_WIDTH) % SCREEN_WIDTH;
//     this.y = (this.y + SCREEN_HEIGHT) % SCREEN_HEIGHT;
//   }

//   draw(ctx) {
//     // This is intended to be overridden
//   }

//   drawWrapped(ctx, drawFunc) {
//     // Draw entity in 9 positions (center + 8 around edges if necessary)
//     const offsetsX = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];
//     const offsetsY = [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT];

//     for (let dx of offsetsX) {
//       for (let dy of offsetsY) {
//         drawFunc(this.x + dx, this.y + dy);
//       }
//     }
//   }
// }
