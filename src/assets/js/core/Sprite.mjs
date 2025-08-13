// Updated Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants.mjs';
import { randomUnitVector } from '../utils/math.mjs';

export default class Sprite {
  constructor(props) {
    this.vector   = props.vector    || randomUnitVector();
    this.speed    = props.moveSpeed || 0;
    this.rotSpeed = props.rotSpeed  || 0;
    this.radius   = props.radius    || 10;
    this.width    = props.width     || this.radius * 2;
    this.height   = props.height    || this.radius * 2;
    this.x        = props.x         || SCREEN_WIDTH / 2;
    this.y        = props.y         || SCREEN_HEIGHT / 2;
    this.vx       = props.vx        || this.vector.x * 0; //this.speed;
    this.vy       = props.vy        || this.vector.y * 0; //this.speed;
    this.rotation = props.rotation  || 0.0;
    this.collided = props.collided  || false;
    this.model    = null;
    this.image    = null;
    this.models   = [];
    this.images   = [];
  }

  update(dt) {
    this.x        = (this.x + this.vx * dt + SCREEN_WIDTH) % SCREEN_WIDTH;
    this.y        = (this.y + this.vy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    this.rotation = (this.rotation + this.rotSpeed * dt + 360) % 360;

    //console.log(this.rotation);
  
    this.image    = this.images[this.rotation | 0];
    this.model    = this.models[this.rotation | 0];
  }

  draw(ctx) {
    //console.log('draw ASTEROID');

    const { width, height }  = this.image.canvas;
    const x = this.x - (width / 2);
    const y = this.y - (height / 2);
    ctx.drawImage(this.image.canvas, x, y, width, height);
  }

  // draw(ctx) {
  //   console.log('super draw');

  //   // Draw collision circle at main position
  //   //this.drawCollisionCircle(ctx, this.x, this.y);

  //   // Draw main model
  //   const { sx, sy } = this.render(ctx, this.model, this.x, this.y, this.angle, this.scale);

  //   const minX = Math.min(...sx);
  //   const maxX = Math.max(...sx);
  //   const minY = Math.min(...sy);
  //   const maxY = Math.max(...sy);

  //   const nearLeft = minX < 0;
  //   const nearRight = maxX > SCREEN_WIDTH;
  //   const nearTop = minY < 0;
  //   const nearBottom = maxY > SCREEN_HEIGHT;

  //   const offsets = [];

  //   if (nearLeft) offsets.push([SCREEN_WIDTH, 0]);
  //   if (nearRight) offsets.push([-SCREEN_WIDTH, 0]);
  //   if (nearTop) offsets.push([0, SCREEN_HEIGHT]);
  //   if (nearBottom) offsets.push([0, -SCREEN_HEIGHT]);

  //   if (nearLeft && nearTop) offsets.push([SCREEN_WIDTH, SCREEN_HEIGHT]);
  //   if (nearLeft && nearBottom) offsets.push([SCREEN_WIDTH, -SCREEN_HEIGHT]);
  //   if (nearRight && nearTop) offsets.push([-SCREEN_WIDTH, SCREEN_HEIGHT]);
  //   if (nearRight && nearBottom) offsets.push([-SCREEN_WIDTH, -SCREEN_HEIGHT]);

  //   for (const [dx, dy] of offsets) {
  //     const wrapX = this.x + dx;
  //     const wrapY = this.y + dy;
  //     this.render(ctx, this.model, wrapX, wrapY, this.angle, this.scale);
  //     //this.drawCollisionCircle(ctx, wrapX, wrapY);
  //   }
  // }
  forceClockwise() {
    if (this.rotSpeed < 0) this.rotSpeed *= -1;
  }

  forceCounterClockwise() {
    if (this.rotSpeed > 0) this.rotSpeed *= -1;
  }
}
