import Sprite from '../core/Sprite.mjs';
import { getBuffer } from '../screen/buffer.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_ASTEROID, COLOR_DEBUG, DEBUG, SPRITE_TEST } from '../utils/constants.mjs';
import { randomSign } from '../utils/math.mjs';

export default class Asteroid extends Sprite {
  constructor(props) {
    super(props);

    this.rotDir = props.rotDir || randomSign(1);
    this.color = props.color || COLOR_ASTEROID;
    
    console.log("YO NEW ASTEROID");
    
    //this.randomize();
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) { 
    super.draw(ctx);
    
      

    if (DEBUG && SPRITE_TEST) {
      
      drawPixelLine(ctx, this.x, this.y, this.x, this.y, 'red');


      // ctx.save();
      // ctx.fillStyle = COLOR_DEBUG;
      // ctx.strokeStyle = COLOR_DEBUG;
      // ctx.lineWidth = 1;
      // ctx.fillRect(this.x, this.y, 1, 1); // Draw center dot

      // const { x, y, width, height, radius } = this;
      // const s = radius;

      // if (this.collided) {  
      //   Asteroid.drawCollision(ctx, x, y, s);
      // }

      //ctx.restore();
    }
  }
  
  static drawCollision(ctx, x, y, s) {
    drawPixelLine(ctx, x-s, y-s, x+s, y-s);
    drawPixelLine(ctx, x-s, y+s, x+s, y+s);
    drawPixelLine(ctx, x-s, y-s, x-s, y+s);
    drawPixelLine(ctx, x+s, y-s, x+s, y+s);
  }

  static generateModel({ vertices, radius, min=0.8, max=1.0 }) {
    const baseModel = new Array(vertices);
    // Precompute the base model
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const variation = min + Math.random() * (max - min);
      baseModel[i] = {
        x: radius * variation * Math.cos(angle),
        y: radius * variation * Math.sin(angle)
      };
    }
    // Precompute all rotated versions (0°–359°)
    const models = new Array(360);
    for (let deg = 0; deg < 360; deg++) {
      const rad = deg * (Math.PI / 180);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      // Avoid creating new point objects during render by reusing arrays
      const rotated = new Array(vertices);
      for (let i = 0; i < vertices; i++) {
        const p = baseModel[i];
        rotated[i] = {
          x: p.x * cos - p.y * sin,
          y: p.x * sin + p.y * cos
        };
      }
      models[deg] = rotated;
    }
    return models;  
  }

  static generateBuffer(asteroid) {
    const { radius, model, width, height } = asteroid;
    const cols = 36;
    const total = 360;
    const buffer = getBuffer("frames", 36 * width, 10 * height, COLOR_ASTEROID, DEBUG && SPRITE_TEST);

    for (let deg = 0; deg < total; deg++) {
      const col = deg % cols;
      const row = (deg / cols) | 0; // faster Math.floor
      const xOffset = col * width + radius;
      const yOffset = row * height + radius;
      
      const m = model[deg];
      const len = m.length;

      for (let i = 0; i < len; i++) {
        const p1 = m[i];
        const p2 = m[i + 1] || m[0]; // avoid modulo in hot loop

        

        drawPixelLine(buffer, xOffset+p1.x, yOffset+p1.y, xOffset+p2.x, yOffset+p2.y);
      }
    }
        
    return buffer;
  }
}
