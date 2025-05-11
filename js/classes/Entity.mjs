// Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.mjs';
import { drawPixelLine } from '../utils.mjs';

export default class Entity {
  constructor({ name, x, y, dx, dy, size, angle }) {
    this.name     = name;       // string
    this.x        = x;          // float
    this.y        = y;          // float
    this.dx       = -dx;        // float
    this.dy       = dy;         // float 
    this.size     = size;       // int
    this.halfsize = size / 2;   // int
    this.angle = angle;         // float
  }

  update(dt) {
    // WRAP XY POSITION
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;

    // ROTATE THE MODEL
    this.rotate(this.angle);   
    // TRANSLATE THE MODEL
    this.translate(this.x, this.y);
  }

  rotate(angle) {
    for (let i = 0; i < this.vertices; i++) {
      this.sx[i] = 10 * (this.mx[i] * Math.cos(angle) - this.my[i] * Math.sin(angle));
      this.sy[i] = 10 * (this.mx[i] * Math.sin(angle) + this.my[i] * Math.cos(angle));  
    }
  }

  translate(x, y) {    
    for (let i = 0; i < this.vertices; i++) {
      this.sx[i] = Math.floor(this.sx[i] + x); 
      this.sy[i] = Math.floor(this.sy[i] + y); 
    }
  }

  render(ctx) {
    for (let i = 0; i < this.vertices; i++) {
      const x0 = this.sx[i];
      const y0 = this.sy[i];
      const x1 = this.sx[(i+1) % this.vertices];
      const y1 = this.sy[(i+1) % this.vertices];

      drawPixelLine(ctx, x0, y0, x1, y1);
    }
    
    ctx.fillStyle = 'red';
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 1, 1);
  }

  draw(ctx) {    
    
    
  
    //const { x, y, halfsize } = this;

    // Draw the main entity
    //this.render(ctx, 'yellow');

    //ctx.fillStyle = 'red';
    //ctx.fillRect(x, y, 1, 1);

    // const nearLeft   = x - halfsize < 0;
    // const nearRight  = x + halfsize > SCREEN_WIDTH;
    // const nearTop    = y - halfsize < 0;
    // const nearBottom = y + halfsize > SCREEN_HEIGHT;

    // // Horizontal wraps
    // if (nearLeft)   this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize);
    // if (nearRight)  this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize);

    // // Vertical wraps
    // if (nearTop)    this.render(ctx, x - halfsize, y - halfsize + SCREEN_HEIGHT);
    // if (nearBottom) this.render(ctx, x - halfsize, y - halfsize - SCREEN_HEIGHT);

    // // Diagonal corners (only if necessary)
    // if (nearLeft && nearTop)          this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize + SCREEN_HEIGHT);
    // else if (nearLeft && nearBottom)  this.render(ctx, x - halfsize + SCREEN_WIDTH, y - halfsize - SCREEN_HEIGHT);
    // else if (nearRight && nearTop)    this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize + SCREEN_HEIGHT);
    // else if (nearRight && nearBottom) this.render(ctx, x - halfsize - SCREEN_WIDTH, y - halfsize - SCREEN_HEIGHT);
  }

  // render(ctx, x, y) {
  //   throw new Error('Subclasses must implement render()');
  // }
}