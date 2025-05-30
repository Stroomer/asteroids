// Asteroid.mjs
import Entity from '../objects/Entity.mjs';
import { ASTEROID, ASTEROID_COLOR, PI, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
import { randomInt } from '../utils.mjs';

export default class Asteroid extends Entity {
  constructor(x, y) {
    super();

    this.type        = ASTEROID;
    this.x           = x || randomInt(0, SCREEN_WIDTH);
    this.y           = y || randomInt(0, SCREEN_HEIGHT);
    this.dx          = -10 + randomInt(0, 20);
    this.dy          = -10 + randomInt(0, 20);
    this.vertexCount = 30;
    this.scale       = 6;  //randomInt(2, 5);
    this.angle       = 0.0;
    this.model       = this.generateModel(this.vertexCount, this.scale);
    this.r           = this.maxRadius() * this.scale;
    this.collided    = false;
  }

  generateModel(vertexCount, scale) {
    const points = [];
    const radiusBase = 1.0 * scale;
    for (let i = 0; i < vertexCount; i++) {
      const radiusVariation = Math.random() * 0.2 + 0.6; // range: 0.8 - 1.2
      const radius = radiusBase * radiusVariation;
      const angle = (i / vertexCount) * PI * 2;
      const x = radius * Math.sin(angle);
      const y = radius * Math.cos(angle);
      points.push({ x, y });      
    }
    return points;
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) {
    ctx.fillStyle = ASTEROID_COLOR;
    super.draw(ctx);
  }
}
