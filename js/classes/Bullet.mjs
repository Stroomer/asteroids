// Bullet.mjs
import Entity from './Entity.mjs';
import { BULLET_COLOR, BULLET_MAXSPEED, PI } from '../constants.mjs';
import { hypotenusa } from '../utils.mjs';

export default class Bullet extends Entity {
  constructor(parent) {
    super();

    const { x, y, dx, dy, angle, offset } = parent;

    this.name  = 'Bullet';
    this.dx    = dx +  BULLET_MAXSPEED * Math.sin(angle); 
    this.dy    = dy + -BULLET_MAXSPEED * Math.cos(angle);
    this.x     = x + Math.sin(angle) * offset;
    this.y     = y - Math.cos(angle) * offset;
    this.scale = 1;
    this.angle = angle;
    this.model = [{ x: 0, y: 0 }];
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    
    

    //if (hypotenusa(this.dx, this.dy)) {
      
    //}
    // Don't update super-class to avoid wrapping!
  }

  draw(ctx) {
    ctx.fillStyle = BULLET_COLOR;
    super.draw(ctx);
  }
}
