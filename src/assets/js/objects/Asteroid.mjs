import Sprite from '../core/Sprite.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_ASTEROID, DEBUG } from '../utils/constants.mjs';


export default class Asteroid extends Sprite {
  constructor(props) {
    super(props);
    
    this.type = props.type; 
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) {
    
    super.draw(ctx);
      
    if (!DEBUG) {
      ctx.save();
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x-1, this.y-1, 2, 2);
      ctx.restore();
    }


    //ctx.fillStyle = COLOR_ASTEROID;

    // drawPixelLine(ctx, 0, 0, 100, 100);

    // for (let i = 0; i < this.model.length; i++) {
    //   const vertex = this.model[i];
    //   const next   = this.model[(i + 1) % this.model.length];
    //   drawPixelLine(ctx, this.x + vertex.x, this.y + vertex.y, this.x + next.x, this.y + next.y);
    // }
    // ctx.drawImage(this.image, this.x, this.y);
  }
}



// this.rotation = (this.rotation + this.rotSpeed * dt) % 360;
// this.image = this.base.frames[this.rotation | 0];
// this.model = this.base.models[this.rotation | 0];
// console.log(this.rotation);

// ctx.fillStyle = ASTEROID_COLOR;
// const model  = this.model[this.rotation | 0]
// const points = model.length;
// for (let i = 0; i < points; i++) {
//   const vertex = model[i];
//   const next   = model[(i + 1) % points];
//   drawPixelLine(ctx, this.x + vertex.x, this.y + vertex.y, this.x + next.x, this.y + next.y);
// }
// ctx.drawImage(this.image, this.x, this.y);
