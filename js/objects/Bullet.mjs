// Bullet.mjs
import Entity from '../objects/Entity.mjs';
import { BULLET, BULLET_COLOR, BULLET_MAXSPEED, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
// import Factory from '../tools/Factory.mjs';

export default class Bullet extends Entity {
  constructor({ x, y, dx, dy, angle, offset }) {
    super();

    this.type     = BULLET;
    this.dx       = dx +  BULLET_MAXSPEED * Math.sin(angle); 
    this.dy       = dy + -BULLET_MAXSPEED * Math.cos(angle);
    this.x        = x + Math.sin(angle) * offset;
    this.y        = y - Math.cos(angle) * offset;
    this.scale    = 1;
    this.angle    = angle;
    this.model    = [{ x: 0, y: 0 }];
    this.r        = this.maxRadius();
    this.collided = false;
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    // if (this.x < 0 || this.x > SCREEN_WIDTH || this.y < 0 || this.y > SCREEN_HEIGHT) {
      //Entity.GARBAGE.push(this.uid);
    // }

    //if (distance(this.dx, this.dy)) {
      
    //}

    //super.checkCollisions();
    // Don't update super-class to avoid wrapping!
  }

  draw(ctx) {
    ctx.fillStyle = BULLET_COLOR;
    super.draw(ctx);
  }
}
