import Asteroid from "../objects/Asteroid.mjs";
import { getBuffer } from "../screen/buffer.mjs";
import { drawPixelLine } from "../screen/screen.mjs";
import { COLOR_ASTEROID, DEBUG } from "../utils/constants.mjs";
import { randomInt, randomX, randomY } from "../utils/math.mjs";

export default class AsteroidFactory {
  constructor() {
    this.asteroidTypes = [
      this.createAsteroidType(0, 2),
      this.createAsteroidType(1, 2),
      this.createAsteroidType(2, 2),
      this.createAsteroidType(3, 2),
      this.createAsteroidType(4, 2),
      this.createAsteroidType(5, 2),
    ];
  }
  
  createRandomAsteroidsList(n) {
    const randomAsteroidList = [];
    for (let i = 0; i < n; i++) {
        const randomType      = randomInt(0, this.asteroidTypes.length - 1);
        const randomVariation = randomInt(0, this.asteroidTypes[randomType].length - 1);
        const clonedElement = this.asteroidTypes[randomType][randomVariation];
        randomAsteroidList.push(clonedElement);
    }
    return randomAsteroidList;
  }
    
  createAsteroidType(type, seed) {
    const result = [];
    for (let i = 0; i < seed; i++) {
      switch (type) {
        case 0: result.push(this.createAsteroid({ type, x:randomX(), y:randomY(), vertices:6,  radius:5,  moveSpeed:40, rotSpeed:32 }));  break;
        case 1: result.push(this.createAsteroid({ type, x:randomX(), y:randomY(), vertices:8,  radius:8,  moveSpeed:30, rotSpeed: 24 })); break;
        case 2: result.push(this.createAsteroid({ type, x:randomX(), y:randomY(), vertices:10, radius:12, moveSpeed:20, rotSpeed: 16 })); break;
        case 3: result.push(this.createAsteroid({ type, x:randomX(), y:randomY(), vertices:12, radius:17, moveSpeed:15, rotSpeed: 12 })); break;
        case 4: result.push(this.createAsteroid({ type, x:randomX(), y:randomY(), vertices:14, radius:23, moveSpeed:10, rotSpeed: 8 }));  break;       
        case 5: result.push(this.createAsteroid({ type, x:randomX(), y:randomY(), vertices:16, radius:32, moveSpeed:5,  rotSpeed: 4 }));  break;               
      }    
    }
    return result;
  }

  createAsteroid(props) {
    const { type, vertices, radius, min=0.8, max=1.0 } = props;
    const asteroid = new Asteroid(props);
    const baseModel = [];
    const models = [];
    const images = [];
    // Generate points for base model (at angle 0°)
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const variation = min + Math.random() * (max - min);
      const x = radius * variation * Math.cos(angle);
      const y = radius * variation * Math.sin(angle);
      baseModel.push({ x, y });
    }
    // Generate points for all models (rotated from angle 0° to 359°)
    for (let deg = 0; deg < 360; deg++) {
      const rad = deg * (Math.PI / 180);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const rotModel = [];
      for (let i = 0; i < baseModel.length; i++) {
        const pnt = baseModel[i];
        const x = pnt.x * cos - pnt.y * sin;
        const y = pnt.x * sin + pnt.y * cos;
        rotModel.push({ x, y });
      }
      models.push(rotModel);
    }
    // Render all models to canvas-buffer (for all rotated models) and save sprites inside Asteroid Object
    for (let deg = 0; deg < 360; deg++) {
      const id = `asteroid_type${type}_deg${deg}`;
      const model = models[deg];
      const width = radius * 2;
      const height = radius * 2;
      const color = COLOR_ASTEROID;
      const display = DEBUG ? true : false;
      const ctx = getBuffer({ id, width, height, color, display });
      for (let i = 0; i < model.length; i++) {   
        const p1 = model[i];
        const p2 = model[(i + 1) % model.length];        
        const x1 = p1.x + radius;
        const y1 = p1.y + radius;
        const x2 = p2.x + radius;
        const y2 = p2.y + radius;
        drawPixelLine(ctx, x1, y1, x2, y2);
      }
      images.push(ctx);
      //if (DEBUG) document.body.appendChild(ctx.canvas);            
    }
    asteroid.models = models;
    asteroid.images = images;
    return asteroid;
  }
}