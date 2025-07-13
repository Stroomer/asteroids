import { drawPixelLine, getCanvas } from '../utils.mjs';

class Factory {
  constructor() {
    if (Factory.instance) {
      return Factory.instance;
    }

    this.asteroid1 = this.createAsteroid({ type: 1, vertices: 13, radius: 10, min: 0.8, max: 1.0 });

    Factory.instance = this; // Cache the instance
    Object.freeze(this); // Optional: freeze to prevent modification
  }

  createAsteroid({ type, vertices, radius, min, max }) {
    // Generate base model points (angle 0°)
    const model = [];
    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const variation = min + Math.random() * (max - min);
      const x = radius * variation * Math.cos(angle);
      const y = radius * variation * Math.sin(angle);
      model.push({ x, y });
    }

    // Generate points for all 360 angles (angle 0° to 359°)
    const models = [];
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

    // Render points for all 360 angles to canvas
    const size = radius * 2;
    const ids = [];
    const frames = [];
    for (let deg = 0; deg < 360; deg++) {
      const id = `asteroid_${type}_${deg}`;
      const ctx = getCanvas(id, size, size);
      const model = models[deg];
      for (let i = 0; i < model.length; i++) {
        const p1 = model[i];
        const p2 = model[(i + 1) % model.length];
        const x1 = radius + p1.x;
        const y1 = radius + p1.y;
        const x2 = radius + p2.x;
        const y2 = radius + p2.y;
        drawPixelLine(ctx, x1, y1, x2, y2);
      }
      document.body.appendChild(ctx.canvas);
      ids.push(id);
      frames.push(ctx.canvas);
    }

    return { name: `asteroid_${type}`, model, models, ids, frames };
  }
}

export const factory = new Factory();
