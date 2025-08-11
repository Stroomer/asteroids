import Asteroid from "../objects/Asteroid.mjs";
import { getBuffer } from "../screen/buffer.mjs";
import { drawPixelLine } from "../screen/screen.mjs";
import { COLOR_ASTEROID, DEBUG } from "../utils/constants.mjs";
import { randomUnitVector } from "../utils/math.mjs";

export default class Factory {
  constructor() {
    if (Factory.instance) {
      return Factory.instance;
    }

    this.asteroidFactory = new AsteroidFactory();

    Factory.instance = this; // Cache the instance    
    Object.freeze(this); // Optional: freeze to prevent modification

    
    //this.shipFactory     = new ShipFactory();
  }

  createAsteroid() {

  }

  createShip() {

  }
}

class AsteroidFactory {
  constructor() {
    if (AsteroidFactory.instance) {
      return AsteroidFactory.instance;
    }
    
    //const t1 = { type: 1, vertices: 16, radius: 32, moveSpeed: 10, rotSpeed: 10 };
    


    //const t2 = { type:2, vertices: 8, radius: 16, moveSpeed:15, rotSpeed:20 };
    


    // const t3 = { type: 3, vertices: 7, radius: 8, moveSpeed: 30, rotation:10.0, rotSpeed:80, min: 0.80, max: 1.0 };
    
    
    const t4 = { type: 4, vertices: 6, radius: 5, moveSpeed: 60, rotation: 10.0, rotSpeed: 180, min: 0.80, max: 1.0 };
        
    
    
    
    


    this._asteroid = this.createAsteroid(t4);

    
    

    // this.asteroids = [];

    // this.asteroids.push(this.createAsteroid({ vertices: 7,  radius: 5,  min: 0.8, max: 1.0, speed: 30 }));
    // this.asteroids.push(this.createAsteroid({ vertices: 8,  radius: 10, min: 0.8, max: 1.0, speed: 21 }));
    // this.asteroids.push(this.createAsteroid({ vertices: 10, radius: 15, min: 0.8, max: 1.0, speed: 16 }));
    // this.asteroids.push(this.createAsteroid({ vertices: 12, radius: 20, min: 0.8, max: 1.0, speed: 11 }));
    // this.asteroids.push(this.createAsteroid({ vertices: 14, radius: 25, min: 0.8, max: 1.0, speed: 8  }));
    // this.asteroids.push(this.createAsteroid({ vertices: 17, radius: 30, min: 0.8, max: 1.0, speed: 5  }));
    // this.asteroids.push(this.createAsteroid({ vertices: 20, radius: 40, min: 0.8, max: 1.0, speed: 3  }));

    AsteroidFactory.instance = this; // Cache the instance
    Object.freeze(this); // Optional: freeze to prevent modification
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
      if (DEBUG) document.body.appendChild(ctx.canvas);            
    }
    asteroid.models = models;
    asteroid.images = images;
    return asteroid;
  }
}

class ShipFactory {
  constructor() {
    if (ShipFactory.instance) {
      return ShipFactory.instance;
    }

    ShipFactory.instance = this; // Cache the instance
    Object.freeze(this); // Optional: freeze to prevent modification
  }
}




// getRandomAsteroidType() {
  //   const random = randomInt(0, this.asteroids.length - 1);
  //   return { ...this.asteroids[random] };
  // }

  // createAsteroid({ type, vertices, radius, min, max, speed }) {
  //   // Generate base model points (angle 0°)
  //   const model = [];
  //   for (let i = 0; i < vertices; i++) {
  //     const angle = (i / vertices) * Math.PI * 2;
  //     const variation = min + Math.random() * (max - min);
  //     const x = radius * variation * Math.cos(angle);
  //     const y = radius * variation * Math.sin(angle);
  //     model.push({ x, y });
  //   }

  //   // Generate points for all 360 angles (angle 0° to 359°)
  //   const models = [];
  //   for (let deg = 0; deg < 360; deg++) {
  //     const rad = deg * (Math.PI / 180);
  //     const cos = Math.cos(rad);
  //     const sin = Math.sin(rad);
  //     const rotatedModel = [];
  //     for (let i = 0; i < model.length; i++) {
  //       const point = model[i];
  //       const x = point.x * cos - point.y * sin;
  //       const y = point.x * sin + point.y * cos;
  //       rotatedModel.push({ x, y });
  //     }
  //     models.push(rotatedModel);
  //   }

  //   // Render points for all 360 angles to canvas
  //   const size = radius * 2;
  //   const ids = [];
  //   const frames = [];
  //   for (let deg = 0; deg < 360; deg++) {
  //     const id = `asteroid_${type}_${deg}`;
  //     const ctx = getCanvas(id, size, size);
  //     const model = models[deg];
  //     for (let i = 0; i < model.length; i++) {
  //       const p1 = model[i];
  //       const p2 = model[(i + 1) % model.length];
  //       const x1 = radius + p1.x;
  //       const y1 = radius + p1.y;
  //       const x2 = radius + p2.x;
  //       const y2 = radius + p2.y;
  //       drawPixelLine(ctx, x1, y1, x2, y2);
  //     }
  //     document.body.appendChild(ctx.canvas);
  //     ids.push(id);
  //     frames.push(ctx.canvas);
  //   }

  //   return { name: `asteroid_${type}`, model, models, ids, frames, radius, speed };
  // }