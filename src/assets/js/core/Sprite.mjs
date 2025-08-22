import { getBuffer } from '../screen/buffer.mjs';
import { SCREEN_WIDTH, SCREEN_HEIGHT, BUFFER_SPRITE_VISIBLE } from '../utils/constants.mjs';
import { randomSign, randomUnitVector, randomX, randomY, vector2D } from '../utils/math.mjs';
import Asteroid from '../objects/Asteroid.mjs';
import { drawPixelLine } from '../screen/screen.mjs';

export default class Sprite {
  constructor(props) {
    this.type      = props.type      || undefined;
    this.vector    = props.vector    || vector2D(0, 0);
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
    
    this.validate(this); // validate if props are admissible
  }

  update(dt) {
    this.x = (this.x + this.vx * dt + SCREEN_WIDTH) % SCREEN_WIDTH;
    this.y = (this.y + this.vy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    this.rotation = (this.rotation + (this.rotDir * this.rotSpeed) * dt + 360) % 360;    

    //if(this instanceof Ship) console.log('shippert');
    
    // if (!(this instanceof Asteroid)) {
    //   console.log("this is not a ship!");
    // }
    
    console.log(`x: ${this.vy}`);
    
  }

  draw(ctx) {
    const rot = 0; ///this.rotation | 0;   // integer angle index
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

  validate() {
    if (this instanceof Asteroid) {
      if (this.radius % 2 !== 0)                           throw Error("Asteroid radius must be divisible by two");
      //if (!ASTEROID_ALLOWED_SIZES.includes(this.radius)) throw Error("Asteroid radius not found in ASTEROID_ALLOWED_SIZES");
    }
  }

  static generateModel({ vertices, radius, min=0.8, max=1.0, model }) {
    // match number of vertices to model
    if (model) vertices = model.length;
    const baseModel = new Array(vertices);
    // Precompute the base model
    for (let i = 0; i < vertices; i++) {
      if (model) {
        baseModel[i] = model[i];
        continue;
      }      
      const angle = (i / vertices) * Math.PI * 2;
      const variation = min + Math.random() * (max - min);
      baseModel[i] = {
        x: variation * Math.cos(angle),
        y: variation * Math.sin(angle)
      };
    }

    if(model) console.log(baseModel);
    

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
          x: radius * (p.x * cos - p.y * sin),
          y: radius * (p.x * sin + p.y * cos)
        };
      }
      models[deg] = rotated;
    }
    return models;  
  }

  static generateBuffer(asteroid) {
    const { radius, model, width, height, color } = asteroid;
    const cols = 36;
    const total = 360;
    const buffer = getBuffer("frames", 36 * width, 10 * height, color, BUFFER_SPRITE_VISIBLE);

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

