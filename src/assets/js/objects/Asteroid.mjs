import Sprite from '../core/Sprite.mjs';
import { getBuffer } from '../screen/buffer.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_ASTEROID, COLOR_DEBUG, DEBUG } from '../utils/constants.mjs';
import { randomSign } from '../utils/math.mjs';

export default class Asteroid extends Sprite {
  constructor(props) {
    super(props);

    // console.log(props);

    this.rotDir = props.rotDir || randomSign(1);
    this.color  = props.color || COLOR_ASTEROID;
    this.model  = Sprite.generateModel(props);
    this.buffer = Sprite.generateBuffer(this);

    // console.log(this.model);
    
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) { 
    super.draw(ctx);
    if (DEBUG) {
      drawPixelLine(ctx, this.x, this.y, this.x, this.y, COLOR_DEBUG);
    }
  }
  
  static drawCollision(ctx, x, y, s) {
    drawPixelLine(ctx, x-s, y-s, x+s, y-s);
    drawPixelLine(ctx, x-s, y+s, x+s, y+s);
    drawPixelLine(ctx, x-s, y-s, x-s, y+s);
    drawPixelLine(ctx, x+s, y-s, x+s, y+s);
  }
}
