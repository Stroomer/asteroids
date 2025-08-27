import { getBuffer } from '../screen/buffer.mjs';
import { SCREEN_WIDTH, SCREEN_HEIGHT, BUFFER_SPRITE_VISIBLE, COS_LOOKUP_TABLE, SIN_LOOKUP_TABLE, COLOR_DEFAULT } from '../utils/constants.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { vector2D } from '../utils/math.mjs';

export default class Sprite {
  constructor(props) {
    this.type      = props.type      || undefined;
    this.color     = props.color     || COLOR_DEFAULT;
    this.vector    = props.vector    || vector2D(0, 0);
    this.speed     = props.moveSpeed || 0;
    this.rotSpeed  = props.rotSpeed  || 0;
    this.rotDir    = props.rotDir    || 1;
    this.radius    = props.radius    || 10;
    this.width     = props.width     || this.radius * 2;
    this.height    = props.height    || this.radius * 2;
    this.x         = props.x         || SCREEN_WIDTH / 2;
    this.y         = props.y         || SCREEN_HEIGHT / 2;
    this.vx        = props.vx        || this.vector.x * this.speed; 
    this.vy        = props.vy        || this.vector.y * this.speed;
    this.rotation  = props.rotation  || 0;
    this.collided  = props.collided  || false;
    this.model     = props.model     || [];
    this.buffer    = props.buffer    || undefined;
  }

  update(dt) {
    this.x = (this.x + this.vx * dt + SCREEN_WIDTH) % SCREEN_WIDTH;
    this.y = (this.y + this.vy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    this.rotation = (this.rotation + this.rotDir * this.rotSpeed * dt + 360) % 360;
  }

  draw(ctx) {
    const rot = this.rotation | 0;
    const cols = 36;
    const col = rot % cols;
    const row = (rot / cols) | 0;

    ctx.drawImage(
      this.buffer.canvas,
      col * this.width, row * this.height, this.width, this.height,
      this.x - this.radius, this.y - this.radius, this.width, this.height
    );
  }

  drawMarker(ctx, point, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x + this.radius * point.x, this.y + this.radius * point.y, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  static anglesToPoints(angles) {
    return angles.map(a => ({ x: Math.cos(a), y: Math.sin(a) }));
  }

  static generateModel({ vertices, radius, min=0.8, max=1.0, model }) {
    if (model) vertices = model.length;
    const baseModel = new Array(vertices);

    for (let i = 0; i < vertices; i++) {
      if (model) {
        baseModel[i] = model[i];
      } else {
        const angle = (i / vertices) * 2 * Math.PI;
        const variation = min + Math.random() * (max - min);
        baseModel[i] = { x: variation * Math.cos(angle), y: variation * Math.sin(angle) };
      }
    }

    const models = new Array(360);
    for (let deg = 0; deg < 360; deg++) {
      const cos = COS_LOOKUP_TABLE[deg];
      const sin = SIN_LOOKUP_TABLE[deg];
      const rotated = new Array(vertices);
      for (let i = 0; i < vertices; i++) {
        const p = baseModel[i];
        rotated[i] = { x: radius * (p.x * cos - p.y * sin), y: radius * (p.x * sin + p.y * cos) };
      }
      models[deg] = rotated;
    }
    return models;
  }

  static generateBuffer(sprite) {
    const { radius, model, width, height, color } = sprite;
    const cols = 36, total = 360;
    const buffer = getBuffer("frames", cols * width, 10 * height, color, BUFFER_SPRITE_VISIBLE);

    for (let deg = 0; deg < total; deg++) {
      const col = deg % cols;
      const row = (deg / cols) | 0;
      const xOffset = col * width + radius;
      const yOffset = row * height + radius;
      const m = model[deg];
      for (let i = 0, len = m.length; i < len; i++) {
        const p1 = m[i];
        const p2 = m[i + 1] || m[0];
        drawPixelLine(buffer, xOffset+p1.x, yOffset+p1.y, xOffset+p2.x, yOffset+p2.y);
      }
    }
    return buffer;
  }
}


// import { getBuffer } from '../screen/buffer.mjs';
// import { SCREEN_WIDTH, SCREEN_HEIGHT, BUFFER_SPRITE_VISIBLE } from '../utils/constants.mjs';
// import { toRadians, vector2D } from '../utils/math.mjs';
// import { drawPixelLine } from '../screen/screen.mjs';

// export default class Sprite {
//   constructor(props) {
//     this.type      = props.type      || undefined;
//     this.vector    = props.vector    || vector2D(0, 0);
//     this.speed     = props.moveSpeed || 0;
//     this.rotSpeed  = props.rotSpeed  || 0;
//     this.rotDir    = props.rotDir    || 1;
//     this.radius    = props.radius    || undefined;
//     this.width     = props.width     || this.radius * 2;
//     this.height    = props.height    || this.radius * 2;
//     this.x         = props.x         || SCREEN_WIDTH / 2;
//     this.y         = props.y         || SCREEN_HEIGHT / 2;
//     this.vx        = props.vx        || this.vector.x * this.speed; 
//     this.vy        = props.vy        || this.vector.y * this.speed;
//     this.rotation  = props.rotation  || 0.0;
//     this.collided  = props.collided  || false;
//     this.model     = props.model     || undefined;
//     this.buffer    = props.buffer    || undefined;
//   }

//   update(dt) {
//     this.x = (this.x + this.vx * dt + SCREEN_WIDTH) % SCREEN_WIDTH;
//     this.y = (this.y + this.vy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
//     this.rotation = (this.rotation + (this.rotDir * this.rotSpeed) * dt + 360.0) % 360.0;
//   }

//   draw(ctx) {
//     const rot = this.rotation | 0;
//     const cols = 36;
//     const col = rot % cols;
//     const row = (rot / cols) | 0;

//     const xOffset = col * this.width;
//     const yOffset = row * this.height;

//     ctx.drawImage(this.buffer.canvas, xOffset, yOffset, this.width, this.height, this.x - this.radius, this.y - this.radius, this.width, this.height);

//     if (this.front) {
//       const { x, y } = this.front[0];
//       const px = this.x + (this.radius * x);
//       const py = this.y + (this.radius * y);
      
//       ctx.save();
//       ctx.fillStyle = 'purple';
//       ctx.beginPath();
//       ctx.arc(px, py, 3, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.restore();
//     }
    
//     if (this.rear) {      
//       const { x, y } = this.rear[0];
//       const px = this.x + (this.radius * x);
//       const py = this.y + (this.radius * y);
      
//       ctx.save();
//       ctx.fillStyle = 'yellow';
//       ctx.beginPath();
//       ctx.arc(px, py, 3, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.restore();
//     }
//   }

//   static generateModel({ vertices, radius, min=0.8, max=1.0, model }) {
//     if (model) vertices = model.length;
//     const baseModel = new Array(vertices);
//     for (let i = 0; i < vertices; i++) {
//       if (model) {
//         baseModel[i] = model[i];
//         continue;
//       }      
//       const angle = (i / vertices) * Math.PI * 2;
//       const variation = min + Math.random() * (max - min);
//       baseModel[i] = {
//         x: variation * Math.cos(angle),
//         y: variation * Math.sin(angle)
//       };
//     }

//     const models = new Array(360);
//     for (let deg = 0; deg < 360; deg++) {
//       const rad = toRadians(deg);
//       const cos = Math.cos(rad);
//       const sin = Math.sin(rad);
//       const rotated = new Array(vertices);
//       for (let i = 0; i < vertices; i++) {
//         const p = baseModel[i];
//         rotated[i] = {
//           x: radius * (p.x * cos - p.y * sin),
//           y: radius * (p.x * sin + p.y * cos)
//         };
//       }
//       models[deg] = rotated;
//     }
//     return models;  
//   }

//   static generateBuffer(asteroid) {
//     const { radius, model, width, height, color } = asteroid;
//     const cols = 36;
//     const total = 360;
//     const buffer = getBuffer("frames", 36 * width, 10 * height, color, BUFFER_SPRITE_VISIBLE);

//     for (let deg = 0; deg < total; deg++) {
//       const col = deg % cols;
//       const row = (deg / cols) | 0;
//       const xOffset = col * width + radius;
//       const yOffset = row * height + radius;
      
//       const m = model[deg];
//       const len = m.length;
      
//       for (let i = 0; i < len; i++) {
//         const p1 = m[i];
//         const p2 = m[i + 1] || m[0];
//         drawPixelLine(buffer, xOffset+p1.x, yOffset+p1.y, xOffset+p2.x, yOffset+p2.y);
//       }
//     }
        
//     return buffer;
//   }
// }