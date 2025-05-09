// Asteroid.mjs
import Entity from './Entity.mjs';
import { P1_COLOR } from '../constants.mjs';
import { isDown, isUp } from '../keyboard.mjs';


export default class Player extends Entity {
  constructor({ name, x, y, dx, dy, size, keys }) {
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

    if (isDown(this.keys.left))   this.angle -= 5.0 * dt;
    if (isDown(this.keys.right))  this.angle += 5.0 * dt;
    if (isDown(this.keys.fire))   console.log(`${this.name} FIRE`);
      
    super.update(dt);
  }

  render(ctx, x, y, color) {
    // ctx.fillStyle = color;
    // ctx.fillRect(Math.floor(x), Math.floor(y), this.size, this.size);

    // rotate
    // translate 
    // draw polygon 
    
    const { angle } = this;  
    const mx = [0.0, -2.5, 2.5];
    const my = [ -5,  2.5, 2.5];
    let sx = [];
    let sy = [];
    const scale = 2;

    // ROTATE THE MODEL
    for (let i = 0; i < 3; i++) {
      sx[i] = scale * (mx[i] * Math.cos(angle) - my[i] * Math.sin(angle));
      sy[i] = scale * (mx[i] * Math.sin(angle) + my[i] * Math.cos(angle));  
    }

    // TRANSLATE THE MODEL
    for (let i = 0; i < 3; i++) {
      sx[i] = Math.floor(sx[i] + x) + 0.5; 
      sy[i] = Math.floor(sy[i] + y) + 0.5; 
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