// Asteroid.mjs
import Entity from './Entity.mjs';
import { BULLET, BULLET_SPEED, KEYBOARD, PLAYER_COLOR, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
import { isDown, isUp } from '../keyboard.mjs';
import Factory from './Factory.mjs';

export default class Player extends Entity {
  constructor(index, entities) {
    super();

    console.log(index);
    

    this.name = `Player`;
    this.x     = SCREEN_WIDTH  / 4 * (index === 1 ? 1 : 3);
    this.y     = SCREEN_HEIGHT / 2;
    this.dx    = 0.0;
    this.dy    = 0.0;
    this.scale = 5;
    this.angle = 0.0;
    this.accel = 40.0;
    this.model = [{ x: 0.0, y: -5.5 }, { x: -2.5, y: 2.5 }, { x: 2.5, y: 2.5 }];
    this.keys  = KEYBOARD[(index === 1 ? 0 : 1)];
    this.canShoot = true;

    this.entities = entities;
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
    if (isDown(this.keys.fire) && this.canShoot) {      
      this.canShoot = false;
      Factory.CREATE(this.entities, BULLET, 1, { x:this.x, y:this.y, angle:this.angle });
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