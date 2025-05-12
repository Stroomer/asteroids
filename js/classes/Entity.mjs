// Updated Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT, DEBUGGING, DEBUG_COLOR, P1_COLOR } from '../constants.mjs';
import { drawPixelLine  } from '../utils.mjs';

export default class Entity {
  constructor({ name, x, y, dx, dy, scale, angle }) {
    this.name  = name;
    this.x     = x;
    this.y     = y;
    this.dx    = -dx;
    this.dy    = dy;
    this.scale = scale;
    this.angle = angle;
  }

  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  render(ctx, model, x, y, angle, scale) {
    const vCount = model.length;
	  const sx = [];
	  const sy = [];

    for (let i = 0; i < vCount; i++) {
      const vertex = model[i];
      sx[i] = (vertex.x * Math.cos(angle) - vertex.y * Math.sin(angle)) * scale + x;
      sy[i] = (vertex.x * Math.sin(angle) + vertex.y * Math.cos(angle)) * scale + y;
      sx[i] = Math.floor(sx[i]);
      sy[i] = Math.floor(sy[i]);
    }

    for (let i = 0; i < vCount; i++) {
      const x0 = sx[i];
      const y0 = sy[i];
      const x1 = sx[(i + 1) % vCount];
   	  const y1 = sy[(i + 1) % vCount];
	    drawPixelLine(ctx, x0, y0, x1, y1);
    }

    return { sx, sy }; // Return for bounding box
  }

  draw(ctx) {
    // Draw main entity
    const { sx, sy } = this.render(ctx, this.model, this.x, this.y, this.angle, this.scale);
    const minX = Math.min(...sx);
    const maxX = Math.max(...sx);
    const minY = Math.min(...sy);
    const maxY = Math.max(...sy);

    const nearLeft   = minX < 0;
    const nearRight  = maxX > SCREEN_WIDTH;
    const nearTop    = minY < 0;
    const nearBottom = maxY > SCREEN_HEIGHT;

    if (nearLeft)   this.render(ctx, this.model, this.x + SCREEN_WIDTH, this.y, this.angle, this.scale);
    if (nearRight)  this.render(ctx, this.model, this.x - SCREEN_WIDTH, this.y, this.angle, this.scale);
    if (nearTop)    this.render(ctx, this.model, this.x, this.y + SCREEN_HEIGHT, this.angle, this.scale);
    if (nearBottom) this.render(ctx, this.model, this.x, this.y - SCREEN_HEIGHT, this.angle, this.scale);

    if (nearLeft && nearTop)          this.render(ctx, this.model, this.x + SCREEN_WIDTH, this.y + SCREEN_HEIGHT, this.angle, this.scale);
    else if (nearLeft && nearBottom)  this.render(ctx, this.model, this.x + SCREEN_WIDTH, this.y - SCREEN_HEIGHT, this.angle, this.scale);
    else if (nearRight && nearTop)    this.render(ctx, this.model, this.x - SCREEN_WIDTH, this.y + SCREEN_HEIGHT, this.angle, this.scale);
    else if (nearRight && nearBottom) this.render(ctx, this.model, this.x - SCREEN_WIDTH, this.y - SCREEN_HEIGHT, this.angle, this.scale);
  }
}




// // Entity.mjs
// import { SCREEN_WIDTH, SCREEN_HEIGHT, DEBUGGING, DEBUG_COLOR, P1_COLOR } from '../constants.mjs';
// import { drawPixelLine  } from '../utils.mjs';

// export default class Entity {
//   constructor({ name, x, y, dx, dy, scale, angle }) {
//     this.name  = name;     // string
//     this.x     = x;        // float
//     this.y     = y;        // float
//     this.dx    = -dx;      // float
//     this.dy    = dy;       // float
//     this.scale = scale;    // float
//     this.angle = angle;    // float
//   }

//   getBoundingBox(sx, sy) {
//     return { x:Math.min(...sx), y:Math.min(...sy), width:Math.max(...sx), height:Math.max(...sy) };
//   }

//   update(dt) {
//     // WRAP XY POSITION
//     this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
//     this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    
    
//   }

//   render(ctx, model, x, y, angle, scale) {
//     const vCount = model.length;
// 	  const sx = [];
// 	  const sy = [];

//     // ROTATE
//     for (let i = 0; i < vCount; i++) {
//       const vertex = model[i];
//       sx[i] = (vertex.x * Math.cos(angle) - vertex.y * Math.sin(angle));
//       sy[i] = (vertex.x * Math.sin(angle) + vertex.y * Math.cos(angle)); 
//     }

//     // SCALE
//     for (let i = 0; i < vCount; i++) {
//       sx[i] = sx[i] * scale;
//       sy[i] = sy[i] * scale; 
//     }

//     // TRANSLATE
//     for (let i = 0; i < vCount; i++) {
//       sx[i] = Math.floor(sx[i] + x); 
//       sy[i] = Math.floor(sy[i] + y);
//     }

//     // DRAW
//     for (let i = 0; i < vCount; i++) {
//       const x0 = sx[i];
//       const y0 = sy[i];
//       const x1 = sx[(i+1) % vCount];
//   	  const y1 = sy[(i + 1) % vCount];
		
//       drawPixelLine(ctx, x0, y0, x1, y1);
//     }
//   }

//   draw(ctx) {    
//     // Draw the main entity
//     this.render(ctx, this.model, this.x, this.y, this.angle, this.scale, P1_COLOR);

//     //ctx.fillStyle = 'red';
//     //ctx.fillRect(x, y, 1, 1);

//     // const nearLeft   = x - halfsize < 0;
//     // const nearRight  = x + halfsize > SCREEN_WIDTH;
//     // const nearTop    = y - halfsize < 0;
//     // const nearBottom = y + halfsize > SCREEN_HEIGHT;

//     // // Horizontal wraps
//     // if (nearLeft)   this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize);
//     // if (nearRight)  this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize);

//     // // Vertical wraps
//     // if (nearTop)    this.render(ctx, x - halfsize, y - halfsize + SCREEN_HEIGHT);
//     // if (nearBottom) this.render(ctx, x - halfsize, y - halfsize - SCREEN_HEIGHT);

//     // // Diagonal corners (only if necessary)
//     // if (nearLeft && nearTop)          this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize + SCREEN_HEIGHT);
//     // else if (nearLeft && nearBottom)  this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize - SCREEN_HEIGHT);
//     // else if (nearRight && nearTop)    this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize + SCREEN_HEIGHT);
//     // else if (nearRight && nearBottom) this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize - SCREEN_HEIGHT);
//   }
// }