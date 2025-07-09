


class ShipFactory {
    constructor() {
      if (ShipFactory.instance) {
        return ShipFactory.instance;
      }

      // Initialize any properties
      this.timestamp = Date.now();

      // Cache the instance
      ShipFactory.instance = this;
      Object.freeze(this); // Optional: freeze to prevent modification
    }
  
    getTime() {
      return this.timestamp;
    }
  }
  
  
  export const factory = new ShipFactory();

  
  
  




export const test_model = generate_asteroid();

console.log(test_model);

function generate_asteroid() {
    const model = [];
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
        model.push({ x, y });
    }
    
    // Step 2: Generate 360 rotated versions
    for (let deg = 0; deg < 360; deg++) {
        const rad = deg * (Math.PI / 180);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
    
        const rotated = model.map(({ x, y }) => ({
        x: x * cos - y * sin,
        y: x * sin + y * cos
        }));
    
        rotations.push(rotated);
    }
    
    return rotations; // Array of 360 rotated shapes
}

function rotate() {

}

function render() {

}

function getImage() {

}