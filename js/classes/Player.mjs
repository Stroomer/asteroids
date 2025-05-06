// Asteroid.mjs
import Entity from './Entity.mjs';
import { P1_COLOR } from '../constants.mjs';
import { isDown, isUp } from '../utils.mjs';

export default class Player extends Entity {
    constructor({ name, x, y, dx, dy, size = 16, keys }) {
    super({ name, x, y, dx, dy, size });
      
    this.keys = keys;
  }

  checkInput() {
    const { up, down, left, right, fire } = this.keys;    

    //console.log(up, down, left, right, fire);
    
      
    if (isDown(up))    console.log(`${this.name} THRUST`);
    if (isDown(down))  console.log(`${this.name} BREAK`);
    if (isDown(left))  console.log(`${this.name} ROTATE CCW`);
    if (isDown(right)) console.log(`${this.name} ROTATE CW`);
    if (isDown(fire))  console.log(`${this.name} FIRE`);
  }

  render(ctx, x, y) {
    ctx.fillStyle = P1_COLOR;
    ctx.fillRect(Math.floor(x) - this.size / 2, Math.floor(y) - this.size / 2, this.size, this.size);
  }
}
