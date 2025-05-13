// Asteroid.mjs
import Entity from './Entity.mjs';
import { BULLET_COLOR, PI } from '../constants.mjs';

export default class Bullet extends Entity {
  constructor({ x, y, dx, dy, scale, angle, debug }) {
    super({ x, y, dx, dy, scale, angle });

    this.debug = debug;
    this.model = [{ x, y }];
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = BULLET_COLOR;
    super.draw(ctx);
  }
}
