// Asteroid.mjs
import Entity from './Entity.mjs';
import { P1_COLOR } from '../constants.mjs';
import { isDown, isUp } from '../keyboard.mjs';
import { drawPixelLine } from '../utils.mjs';


export default class Player extends Entity {
  constructor({ name, x, y, dx, dy, size, keys, debug }) {
    super({ name, x, y, dx, dy, size, angle:0.0 });
      
    this.keys = keys;
    this.debug = debug;
    
  }

  update(dt) {
    const accel = 40.0;

    if (isDown(this.keys.up)) {
      // ACCELERATION changes VELOCITY with respect to TIME
      this.dx +=  Math.sin(this.angle) * accel * dt;
      this.dy += -Math.cos(this.angle) * accel * dt;
    }
    // VELOCITY changes POSITION with respect to TIME
    if (isDown(this.keys.down)) {
      this.dx -=  Math.sin(this.angle) * (accel/2) * dt;
      this.dy -= -Math.cos(this.angle) * (accel/2) * dt;
    }

    if (isDown(this.keys.left))   this.angle -= 5.0 * dt;
    if (isDown(this.keys.right))  this.angle += 5.0 * dt;
    if (isDown(this.keys.fire))  console.log(`${this.name} FIRE`);
    
    if (isDown(this.debug.space)) {
      this.dx = this.dy = 0;
      console.log('space');    
    }

    if (isDown(this.debug.enter)) {
      this.dx = this.dy = this.angle = this.x = this.y = 0.0;
      console.log('enter');    
    }  
    
      
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
    const my = [ -5.5, 2.5, 2.5];
    let sx = [];
    let sy = [];
    const scale = 8;

    // ROTATE THE MODEL
    for (let i = 0; i < 3; i++) {
      sx[i] = scale * (mx[i] * Math.cos(angle) - my[i] * Math.sin(angle));
      sy[i] = scale * (mx[i] * Math.sin(angle) + my[i] * Math.cos(angle));  
    }

    // TRANSLATE THE MODEL
    for (let i = 0; i < 3; i++) {
      sx[i] = Math.floor(sx[i] + x); 
      sy[i] = Math.floor(sy[i] + y); 
    }

    ctx.fillStyle = color;

    // DRAW THE MODEL
    for (let i = 0; i < 3; i++) {
      const x0 = sx[i];
      const y0 = sy[i];
      const x1 = sx[(i+1) % 3];
      const y1 = sy[(i+1) % 3];

      drawPixelLine(ctx, x0, y0, x1, y1);
    }
  }
}