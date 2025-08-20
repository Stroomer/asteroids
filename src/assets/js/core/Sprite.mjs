import { getBuffer } from '../screen/buffer.mjs';
import { SCREEN_WIDTH, SCREEN_HEIGHT, COLOR_ASTEROID } from '../utils/constants.mjs';
import { randomSign, randomUnitVector } from '../utils/math.mjs';

export default class Sprite {
  constructor(props) {
    this.type      = props.type      || undefined;
    this.vector    = props.vector    || randomUnitVector();
    this.speed     = props.moveSpeed || 0;
    this.rotSpeed  = props.rotSpeed  || 0;
    this.rotDir    = props.rotDir    || 1;
    this.radius    = props.radius    || undefined;
    this.width     = props.width     || this.radius * 2;
    this.height    = props.height    || this.radius * 2;
    this.x         = props.x         || SCREEN_WIDTH / 2;
    this.y         = props.y         || SCREEN_HEIGHT / 2;
    this.vx        = props.vx        || this.vector.x * this.speed;
    this.vy        = props.vy        || this.vector.y * this.speed;
    this.rotation  = props.rotation  || 0.0;
    this.collided  = props.collided  || false;
    this.model     = props.model     || undefined;
    this.buffer    = props.buffer    || undefined;
  }

  randomize() {
    this.vector = randomUnitVector();
    this.vx     = this.vector.x * this.speed;
    this.vy     = this.vector.y * this.speed;  
  }

  update(dt) {
    this.x        = (this.x + this.vx * dt + SCREEN_WIDTH) % SCREEN_WIDTH;
    this.y        = (this.y + this.vy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    this.rotation = (this.rotation + (this.rotDir * this.rotSpeed) * dt + 360) % 360;    
  }

  draw(ctx) {
  const rot = this.rotation | 0;   // integer angle index
  const cols = 36;
  const col = rot % cols;
  const row = (rot / cols) | 0;    // fast floor

  const xOffset = col * this.width;
  const yOffset = row * this.height;

  ctx.drawImage(
    this.buffer.canvas,   // full sprite sheet
    xOffset, yOffset,    // source x,y in sheet
    this.width, this.height, // source w,h
    this.x - this.radius, this.y - this.radius, // dest x,y on screen
    this.width, this.height // dest w,h
  );
}

}
