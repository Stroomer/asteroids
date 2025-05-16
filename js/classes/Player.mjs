// Asteroid.mjs
import Entity from './Entity.mjs';
import { BULLET, BULLET_SPEED, KEYBOARD, PLAYER_COLOR, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
import { isDown, isUp } from '../keyboard.mjs';
import Factory from './Factory.mjs';
import { hypotenusa } from '../utils.mjs';

export default class Player extends Entity {
  constructor(index, amountOfPlayer, entities) {
    super();

    this.name = `Player`;
    this.x     = SCREEN_WIDTH  / 4 * (amountOfPlayer === 1 ? 2 : (index === 1 ? 1 : 3));
    this.y     = SCREEN_HEIGHT / 2;
    this.dx    = 0.0;
    this.dy    = 0.0;
    this.scale = 4;
    this.angle = 0.0;
    this.accel = 200.0;
    this.model = [{ x: 0.0, y: -5.5 }, { x: -2.5, y: 2.5 }, { x: 2.5, y: 2.5 }];
    this.keys  = KEYBOARD[(index === 1 ? 1 : 0)];
    this.canShoot = true;

    this.entities = entities;

    
  }

  update(dt) {
    if (isDown(this.keys.up) ) {
      this.dx += Math.sin(this.angle) * this.accel * dt;
      this.dy += -Math.cos(this.angle) * this.accel * dt;
    }

    // clamp speed
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    const maxSpeed = 80.0;

    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      this.dx *= scale;
      this.dy *= scale;
    }
    // end of clamp
    
    if (isDown(this.keys.down)) {
      this.dx -=  Math.sin(this.angle) * (this.accel/2) * dt;
      this.dy -= -Math.cos(this.angle) * (this.accel/2) * dt;
    }

    if (isDown(this.keys.left))   this.angle -= 5.0 * dt;
    if (isDown(this.keys.right))  this.angle += 5.0 * dt;
    if (isDown(this.keys.fire) && this.canShoot) {      
      const x      = this.x;
      const y      = this.y;
      const dx     = this.dx;
      const dy     = this.dy;
      const angle  = this.angle;
      const offset = 24;

      Factory.CREATE(this.entities, BULLET, 1, { x, y, dx, dy, angle, offset });
      
      this.canShoot = false;
    }
    
    if (isUp(this.keys.fire)) {
      this.canShoot = true;
    }
    
    super.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = PLAYER_COLOR;
    super.draw(ctx);
  }
}