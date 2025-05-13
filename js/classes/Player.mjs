// Asteroid.mjs
import Entity from './Entity.mjs';
import { PLAYER_COLOR } from '../constants.mjs';
import { isDown, isUp } from '../keyboard.mjs';
import { createBullet } from '../main.mjs';
import { getId } from '../utils.mjs';


export default class Player extends Entity {
  constructor({ id, x, y, dx, dy, scale, angle, keys, debug, fireBullet }) {
    super({ id, x, y, dx, dy, scale, angle });
    
    this.name       = "Player";
    this.keys       = keys;
    this.debug      = debug;
    this.accel      = 40.0;
    this.model      = [{ x: 0.0, y: -5.5 }, { x: -2.5, y: 2.5 }, { x: 2.5, y: 2.5 }];
    this.fireBullet = fireBullet;
    this.canShoot   = true;
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
      if (this.canShoot) {
        this.canShoot = false;

        const id    = getId();
        const x     = this.x;
        const y     = this.y;
        const dx    = 50.0  * Math.sin(this.angle) * dt;
        const dy    = -50.0 * Math.cos(this.angle) * dt;
        const scale = 0;
        const angle = 0;

        console.log(this.angle);
        

        createBullet({ id, x, y, dx, dy, scale, angle });
      }
    }
    
    if (isUp(this.keys.fire)) {
      this.canShoot = true;
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