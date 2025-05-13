// Asteroid.mjs
import Entity from './Entity.mjs';
import { PLAYER_COLOR } from '../constants.mjs';
import { isDown } from '../keyboard.mjs';


export default class Player extends Entity {
  constructor({ x, y, dx, dy, scale, angle, keys, debug, fire }) {
    super({ x, y, dx, dy, scale, angle });
    
    this.name  = "Player";
    this.keys  = keys;
    this.debug = debug;
    this.accel = 40.0;
    this.model = [{ x: 0.0, y: -5.5 }, { x: -2.5, y: 2.5 }, { x: 2.5, y: 2.5 }];
    this.fire  = fire;
  }

  update(dt) {
    if (isDown(this.keys.up)) {
      this.dx +=  Math.sin(this.angle) * this.accel * dt;
      this.dy += -Math.cos(this.angle) * this.accel * dt;
    }
    
    if (isDown(this.keys.down)) {
      this.dx -=  Math.sin(this.angle) * (this.accel/2) * dt;
      this.dy -= -Math.cos(this.angle) * (this.accel/2) * dt;
    }

    if (isDown(this.keys.left))   this.angle -= 5.0 * dt;
    if (isDown(this.keys.right))  this.angle += 5.0 * dt;
    if (isDown(this.keys.fire)) {
      this.fire(this.x, this.y, );        
    }
    
    // if (isDown(this.debug.space)) {
    //   this.dx = this.dy = 0;
    //   console.log('space');    
    // }

    // if (isDown(this.debug.enter)) {
    //   this.dx = this.dy = this.angle = this.x = this.y = 0.0;
    //   console.log('enter');    
    // }  
    
    super.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = PLAYER_COLOR;
    super.draw(ctx);
  }
}