// Bullet.mjs
import Entity from './Entity.mjs';
import { BULLET_COLOR, BULLET_SPEED, PI } from '../constants.mjs';

export default class Bullet extends Entity {
  constructor(props) {
    super();

    console.log(props);
    
    const { x, y, angle } = props;

    // this.name = 'Bullet';
    // this.x     = x;
    // this.y     = y;
    this.dx = BULLET_SPEED * Math.sin(angle); //* props.dt;
    this.dy = -BULLET_SPEED * Math.cos(angle); //* props.dt;
    // this.scale = 0;
    // this.angle = angle;
    this.model = [{ x, y }, { x, y:y-1 }];
  }

  update(dt) {
    this.x += -this.dx * dt;
    this.y +=  this.dy * dt;
    // Don't update super-class to avoid wrapping!
  }

  draw(ctx) {
    ctx.fillStyle = BULLET_COLOR;
    super.draw(ctx);
  }
}
