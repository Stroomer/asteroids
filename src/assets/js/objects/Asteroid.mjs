import Sprite from '../core/Sprite.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_ASTEROID, COLOR_DEBUG, DEBUG } from '../utils/constants.mjs';
import { randomSign } from '../utils/math.mjs';


export default class Asteroid extends Sprite {
  constructor(props) {
    super(props);
    
    this.type = props.type;
    this.rotSpeed = randomSign(this.rotSpeed);

    // console.log(`Asteroid created`);
    // console.log(props);
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) { 
    super.draw(ctx);
      
    if (DEBUG) {
      ctx.save();
      ctx.fillStyle = COLOR_DEBUG;
      ctx.strokeStyle = COLOR_DEBUG;
      ctx.lineWidth = 1;
      ctx.fillRect(this.x - 1, this.y - 1, 2, 2); // Draw center dot

      const { x, y, width, height, radius } = this;
      const s = radius;

      if (this.collided) {  
        drawPixelLine(ctx, this.x-s, this.y-s, this.x+s, this.y-s);
        drawPixelLine(ctx, this.x-s, this.y+s, this.x+s, this.y+s);
        drawPixelLine(ctx, this.x-s, this.y-s, this.x-s, this.y+s);
        drawPixelLine(ctx, this.x+s, this.y-s, this.x+s, this.y+s);
      }

      ctx.restore();
    }
  }
}