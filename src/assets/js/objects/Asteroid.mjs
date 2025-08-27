import Sprite from '../core/Sprite.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_ASTEROID, COLOR_DEBUG, DEBUG } from '../utils/constants.mjs';
import { randomSign } from '../utils/math.mjs';

export default class Asteroid extends Sprite {
  constructor(props) {
    super({ ...props, type: 'asteroid' });
    
    this.rotDir = props.rotDir || randomSign(1);
    this.color  = props.color  || COLOR_ASTEROID;
    this.model  = Sprite.generateModel(props);
    this.buffer = Sprite.generateBuffer(this);
  }

  draw(ctx) { 
    super.draw(ctx);
    if (DEBUG) {
      drawPixelLine(ctx, this.x, this.y, this.x, this.y, COLOR_DEBUG);
    }
  }

  static drawCollision(ctx, x, y, r) {
    drawPixelLine(ctx, x-r, y-r, x+r, y-r);
    drawPixelLine(ctx, x-r, y+r, x+r, y+r);
    drawPixelLine(ctx, x-r, y-r, x-r, y+r);
    drawPixelLine(ctx, x+r, y-r, x+r, y+r);
  }
}



// import Sprite from '../core/Sprite.mjs';
// import { drawPixelLine } from '../screen/screen.mjs';
// import { COLOR_ASTEROID, COLOR_DEBUG, DEBUG } from '../utils/constants.mjs';
// import { randomSign } from '../utils/math.mjs';

// export default class Asteroid extends Sprite {
//   constructor(props) {
//     super({ ...props, type:'asteroid' });

//     this.rotDir = props.rotDir || randomSign(1);
//     this.color  = props.color || COLOR_ASTEROID;
//     this.model  = Sprite.generateModel(props);
//     this.buffer = Sprite.generateBuffer(this);
//   }

//   update(dt) {
//     super.update(dt);
//   }

//   draw(ctx) { 
//     super.draw(ctx);
//     if (DEBUG) {
//       drawPixelLine(ctx, this.x, this.y, this.x, this.y, COLOR_DEBUG);
//     }
//   }
  
//   static drawCollision(ctx, x, y, r) {
//     drawPixelLine(ctx, x-r, y-r, x+r, y-r);
//     drawPixelLine(ctx, x-r, y+r, x+r, y+r);
//     drawPixelLine(ctx, x-r, y-r, x-r, y+r);
//     drawPixelLine(ctx, x+r, y-r, x+r, y+r);
//   }
// }