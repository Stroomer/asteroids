// Bullet.mjs
import Entity from './Entity.mjs';
import { BULLET_COLOR, BULLET_SPEED, PI } from '../constants.mjs';

export default class Bullet extends Entity {
  constructor(props) {
    super();

    const { x, y, angle } = props;

    this.name  = 'Bullet';
    this.x     = x;
    this.y     = y;
    this.dx    = BULLET_SPEED * Math.sin(angle); 
    this.dy    = -BULLET_SPEED * Math.cos(angle);
    this.scale = 1;
    this.angle = angle;
    
    this.model = [{ x: 0, y: 0 }];
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    // Don't update super-class to avoid wrapping!
  }

  draw(ctx) {
    ctx.fillStyle = BULLET_COLOR;
    super.draw(ctx);
  }
}
