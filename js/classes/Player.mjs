// Asteroid.mjs
import Entity from './Entity.mjs';
import { P1_COLOR } from '../constants.mjs';
import { isDown, isUp } from '../keyboard.mjs';
import { renderPath } from '../utils.mjs';

export default class Player extends Entity {
    constructor({ name, x, y, dx, dy, size = 16, keys }) {
    super({ name, x, y, dx, dy, size });
      
    this.keys = keys;
  }

  update(dt) {
    if (isDown(this.keys.up)) {
      // ACCELERATION changes VELOCITY with respect to TIME
      this.dx +=  Math.sin(this.angle) * 20.0 * dt;    
      this.dy += -Math.cos(this.angle) * 20.0 * dt;    
    }
    // VELOCITY changes POSITION with respect to TIME
    if (isDown(this.keys.down)) {
      this.dx -=  Math.sin(this.angle) * 20.0 * dt;    
      this.dy -= -Math.cos(this.angle) * 20.0 * dt;    
    }

    if (isDown(this.keys.left))  this.angle -= 5.0 * dt;
    if (isDown(this.keys.right)) this.angle += 5.0 * dt;
    if (isDown(this.keys.fire))  console.log(`${this.name} FIRE`);
      
    super.update(dt);
  }


  // https://youtu.be/QgDR8LrRZhk?t=1725


  render(ctx, x, y) {
    // rotate
    // translate 
    // draw polygon 
    
    ctx.fillStyle = 'yellow';
    ctx.fillRect(Math.floor(x), Math.floor(y), this.size, this.size);
    
    // console.log(x, y);
    

    return;

    const { angle } = this;  
    
    const mx = [0.0, -2.5, 2.5];
    const my = [-5, 2.5, 2.5];
    
    let sx = [];
    let sy = [];

    // ROTATE THE MODEL
    for (let i = 0; i < 3; i++) {
      sx[i] = mx[i] * Math.cos(angle) - my[i] * Math.sin(angle);
      sy[i] = mx[i] * Math.sin(angle) + my[i] * Math.cos(angle);  
    }

    // TRANSLATE THE MODEL
    for (let i = 0; i < 3; i++) {
      sx[i] = sx[i] + x; 
      sy[i] = sy[i] + y;
    }
    
    // DRAW THE MODEL
    ctx.strokeStyle = P1_COLOR;
    ctx.beginPath();
    ctx.moveTo(sx[2], sy[2]);
    for (let i = 0; i < 3; i++) {
      ctx.lineTo(sx[i], sy[i]);  
    }
    ctx.closePath();
    ctx.stroke();
  }
}
