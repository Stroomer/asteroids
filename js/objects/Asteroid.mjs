// Asteroid.mjs
import Entity from '../objects/Entity.mjs';
import { ASTEROID, ASTEROID_COLOR, PI, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
import { randomInt, drawPixelLine } from '../utils.mjs';
import { asteroidFactory } from '../tools/AsteroidFactory.mjs';




export default class Asteroid {
  constructor() {
    this.x           = SCREEN_WIDTH / 2;  //randomInt(0, SCREEN_WIDTH);
    this.y           = SCREEN_HEIGHT / 2;  //randomInt(0, SCREEN_HEIGHT);
    this.dx          = 0;  //-10 + randomInt(0, 20);
    this.dy          = 0;  //-10 + randomInt(0, 20);
    this.size        = 5;  //randomInt(2, 5);
    this.angle       = 0.0;
    this.model       = asteroidFactory.a;
    
    console.log();
    

    this.rotation    = 0;
    this.r           = this.size;  // this.maxRadius() * 
    this.collided = false;
    
    Asteroid.MODELS = [];
  }

  static GENERATE_MODEL() {
    const base = [];
    const rotations = [];
    const vertices = 13;
    const r = 50;
    const min = 0.8;
    const max = 1.0;
  
    // Step 1: Generate base model (angle 0°)
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const variation = min + Math.random() * (max - min);
      const radius = r * variation;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      base.push({ x, y });
    }
  
    // Step 2: Generate 360 rotated versions
    for (let deg = 0; deg < 360; deg++) {
      const rad = deg * (Math.PI / 180);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
  
      const rotated = base.map(({ x, y }) => ({
        x: x * cos - y * sin,
        y: x * sin + y * cos
      }));
  
      rotations.push(rotated);
    }
  
    console.log(rotations.length);
    

    return rotations; // Array of 360 rotated shapes
  }
  
  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    
    this.rotation = (this.rotation + 1) % 360;
    //console.log(this.rotation);

    // this.rotation++;
    //this.model = Asteroid.ROTATE_MODEL(this.model, 36.0 * dt)
    //this.model = Asteroid.GENERATE_MODEL({ rotDeg:this.rotation });
  }

  draw(ctx) {
    ctx.fillStyle = ASTEROID_COLOR;
    
    const model  = this.model[this.rotation | 0]
    const points = model.length;
    for (let i = 0; i < points; i++) {
      const vertex = model[i];
      const next   = model[(i + 1) % points];       
      drawPixelLine(ctx, this.x + vertex.x, this.y + vertex.y, this.x + next.x, this.y + next.y);
    }
  }
}
