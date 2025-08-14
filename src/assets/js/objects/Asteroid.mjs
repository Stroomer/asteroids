import Sprite from '../core/Sprite.mjs';
import { getBuffer } from '../screen/buffer.mjs';
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

  static generateModels(vertices, radius, min, max) {
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

  static generateSprites(type, models, radius, color = COLOR_ASTEROID, debug = false) {
    const images = new Array(360);
    const width = radius * 2;
    const height = radius * 2;
    for (let deg = 0; deg < 360; deg++) {
      const id = `asteroid_type${type}_deg${deg}`;
      const model = models[deg];
      // Create buffer context (offscreen)
      const ctx = getBuffer({ id, width, height, color, display: debug });
      // Draw polygon edges
      const lastIndex = model.length - 1;
      for (let i = 0; i < model.length; i++) {
        const p1 = model[i];
        const p2 = model[(i + 1) % model.length]; // wrap to first point
        drawPixelLine(ctx, p1.x+radius, p1.y+radius, p2.x+radius, p2.y+radius);
      }
      // Store buffer
      images[deg] = ctx;
      // Optional debug display
      if (debug) {
        document.body.appendChild(ctx.canvas);
      }
    }
    return images;
  }

}