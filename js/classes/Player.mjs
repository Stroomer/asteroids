// Asteroid.mjs
import Entity from './Entity.mjs';
import { P1_COLOR } from '../constants.mjs';
import { isDown, isUp } from '../utils.mjs';

export default class Player extends Entity {
    constructor({ name, x, y, dx, dy, size = 16, keys }) {
    super({ name, x, y, dx, dy, size });
      
    this.keys = keys;
  }

  update(dt) {
    //console.log("PLAYER UPDATE");
      
      if (isDown(this.keys.up)) {
        // ACCELERATION changes VELOCITY with respect to TIME
        this.dx +=  Math.sin(this.angle) * 20.0 * dt;    
        this.dy += -Math.cos(this.angle) * 20.0 * dt;    
      }
      
      // VELOCITY changes POSITION with respect to TIME

      // https://youtu.be/QgDR8LrRZhk


    if (isDown(this.keys.down))  this.dx -= Math.sin(this.angle);
    if (isDown(this.keys.left))  this.angle -= 5.0;
    if (isDown(this.keys.right)) this.angle += 5.0;
    if (isDown(this.keys.fire)) console.log(`${this.name} FIRE`);
      
    super.update(dt);
  }

  render(ctx, x, y) {
    ctx.fillStyle = P1_COLOR;
    ctx.fillRect(Math.floor(x) - this.size / 2, Math.floor(y) - this.size / 2, this.size, this.size);
  }
}
