import { drawPixelLine, getCanvas } from './../utils.mjs';

class AsteroidFactory {
  constructor() {
    if (AsteroidFactory.instance) {
      return AsteroidFactory.instance;
    }

    this.a = this.createAsteroid();

    

    AsteroidFactory.instance = this;      // Cache the instance
    Object.freeze(this);                  // Optional: freeze to prevent modification
  }

  createAsteroid() {
    console.log(`create Asteroid`);  //  (vertices:${vertices}, r:${r}, min:${0.8}, max:${max})

    const vertices = 13;
    const radius = 25;
    const min = 0.8;
    const max = 1.0;

    const model  = this.getModel({ model:[], vertices, radius, min, max });
    

    
    const models = this.getRotatedModels({ model, models:[] });

    this.render({ model, size:radius*2 });

    //const renderedModels = this.getRenderedModels({ rotatedModels, images: [] });

    //console.log(rotations);
    
    return models;
  }

  getModel({ model, vertices, radius, min, max }) {
    // Generate one base model (angle 0°)
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const variation = min + Math.random() * (max - min);
      const diameter = radius * 2 * variation;
      const x = diameter * Math.cos(angle);
      const y = diameter * Math.sin(angle);
      model.push({ x, y });
    }
    return model;
  }

  render({ model, size }) {
    const ctx = getCanvas('test', size, size);
    ctx.fillStyle = 'white';
    for (let i = 0; i < model.length; i++) {
          const p1 = model[i];
          const p2 = model[(i + 1) % model.length];       
          drawPixelLine(ctx, p1.x, p1.y, p2.x, p2.y);
    }
    document.body.appendChild(ctx.canvas);
  }

  getRotatedModels({ model, models }) {
    // Generate 360 models (angle 0° to 359°)
    for (let deg = 0; deg < 360; deg++) {
      const rad = deg * (Math.PI / 180);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const rotatedModel = [];
      for (let i = 0; i < model.length; i++) {
        const point = model[i];
        const x = point.x * cos - point.y * sin;
        const y = point.x * sin + point.y * cos;
        rotatedModel.push({ x, y });
      }

      models.push(rotatedModel);
    }

    return models;
  }
}


export const asteroidFactory = new AsteroidFactory(); 













// export const asteroidFactory = new AsteroidFactory();

// function generate_asteroid() {
//   const model = [];
//   const rotations = [];
//   const vertices = 13;
//   const r = 50;
//   const min = 0.8;
//   const max = 1.0;

//   // Step 1: Generate base model (angle 0°)
//   for (let i = 0; i < vertices; i++) {
//     const angle = (i / vertices) * Math.PI * 2;
//     const variation = min + Math.random() * (max - min);
//     const radius = r * variation;
//     const x = radius * Math.cos(angle);
//     const y = radius * Math.sin(angle);
//     model.push({ x, y });
//   }

//   // Step 2: Generate 360 rotated versions
//   for (let deg = 0; deg < 360; deg++) {
//     const rad = deg * (Math.PI / 180);
//     const cos = Math.cos(rad);
//     const sin = Math.sin(rad);

//     const rotated = model.map(({ x, y }) => ({
//       x: x * cos - y * sin,
//       y: x * sin + y * cos,
//     }));

//     rotations.push(rotated);
//   }

//   return rotations; // Array of 360 rotated shapes
// }

// function rotate() {}

// function render() {}

// function getImage() {}
