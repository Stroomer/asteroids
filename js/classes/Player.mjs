// Asteroid.mjs
import Entity from './Entity.mjs';
import { P1_COLOR } from '../constants.mjs';
import { isDown, isUp } from '../keyboard.mjs';


export default class Player extends Entity {
  constructor({ name, x, y, dx, dy, scale, angle, keys, debug }) {
    super({ name, x, y, dx, dy, scale, angle });
    
    this.keys  = keys;
    this.debug = debug;
    
    this.accel = 40.0;
    
    this.model = [{x:0.0, y:-5.5}, {x:-2.5, y:2.5}, {x:2.5, y:2.5}];

    

    this.mx     = [0.0, -2.5, 2.5];
    this.my     = [-5.5, 2.5, 2.5];
    this.sx     = [];
    this.sy     = [];
    //this.verts  = this.mx.length;
    
    // this.width = 0;
    // this.height = 0;

    // calculate radius
    //this.radius = this.getRadius();
  }

  update(dt) {
    if (isDown(this.keys.up)) {
      // ACCELERATION changes VELOCITY with respect to TIME
      this.dx +=  Math.sin(this.angle) * this.accel * dt;
      this.dy += -Math.cos(this.angle) * this.accel * dt;
    }
    // VELOCITY changes POSITION with respect to TIME
    if (isDown(this.keys.down)) {
      this.dx -=  Math.sin(this.angle) * (this.accel/2) * dt;
      this.dy -= -Math.cos(this.angle) * (this.accel/2) * dt;
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

  // render(ctx, color) {
  //   // console.log('player render');
  //   ctx.fillStyle = color;
  //   super.render(ctx);
  // }

  draw(ctx) {
    ctx.fillStyle = P1_COLOR;
    super.draw(ctx);
  }
}