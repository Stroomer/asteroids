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

    const model     = this.getModel( { model:[], vertices:13, r:50, min:0.8, max:1.0 } );
    const rotations = this.getRotations({ model, rotations:[] });
    //const images    = this.getRenderedImages();

    //console.log(rotations);
    
    return rotations;
  }

  getModel({ model, vertices, r, min, max }) {
    // Generate base model (angle 0°)
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const variation = min + Math.random() * (max - min);
      const radius = r * variation;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      model.push({ x, y });
    }

    return model;
  }

  getRotations({ model, rotations }) {
    // Generate 360 rotated versions
    for (let deg = 0; deg < 360; deg++) {
      const rad = deg * (Math.PI / 180);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const rotated = model.map(({ x, y }) => ({
        x: x * cos - y * sin,
        y: x * sin + y * cos,
      }));

      rotations.push(rotated);
    }

    return rotations; // Array of 360 rotated shapes
  }

  getRenderedImages() {

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
