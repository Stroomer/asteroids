// Updated Entity.mjs
import { SCREEN_WIDTH, SCREEN_HEIGHT, PI } from '../constants.mjs';
import { drawPixelLine, getUid  } from '../utils.mjs';

export default class Entity {
  constructor() {
    this.uid   = getUid();
    this.speed = 0;

    console.log(this.uid);
    
  }

  update(dt) {

    console.log('super update');
    

    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
  }

  render(ctx, model, x, y, angle, scale) {
    
    //console.log(angle);
     
    
    const vertexCount = model.length;
	  const sx = [];
	  const sy = [];

    for (let i = 0; i < vertexCount; i++) {
      const vertex = model[i];
      sx[i] = (vertex.x * Math.cos(angle) - vertex.y * Math.sin(angle)) * scale;
      sy[i] = (vertex.x * Math.sin(angle) + vertex.y * Math.cos(angle)) * scale;
      sx[i] = Math.floor(sx[i] + x);
      sy[i] = Math.floor(sy[i] + y);
    }

    for (let i = 0; i < vertexCount; i++) {
      const x0 = sx[i];
      const y0 = sy[i];
      const x1 = sx[(i + 1) % vertexCount];
      const y1 = sy[(i + 1) % vertexCount];
      
	    drawPixelLine(ctx, x0, y0, x1, y1);
    }

    return { sx, sy }; // Return for bounding box
  }

  draw(ctx) {
    console.log("super draw");
    
    // Draw collision circle at main position
    //this.drawCollisionCircle(ctx, this.x, this.y);
  
    // Draw main model
    const { sx, sy } = this.render(ctx, this.model, this.x, this.y, this.angle, this.scale);
  
    const minX = Math.min(...sx);
    const maxX = Math.max(...sx);
    const minY = Math.min(...sy);
    const maxY = Math.max(...sy);
  
    const nearLeft   = minX < 0;
    const nearRight  = maxX > SCREEN_WIDTH;
    const nearTop    = minY < 0;
    const nearBottom = maxY > SCREEN_HEIGHT;
  
    const offsets = [];
  
    if (nearLeft)                    offsets.push([SCREEN_WIDTH, 0]);
    if (nearRight)                   offsets.push([-SCREEN_WIDTH, 0]);
    if (nearTop)                     offsets.push([0, SCREEN_HEIGHT]);
    if (nearBottom)                  offsets.push([0, -SCREEN_HEIGHT]);
  
    if (nearLeft && nearTop)         offsets.push([SCREEN_WIDTH, SCREEN_HEIGHT]);
    if (nearLeft && nearBottom)      offsets.push([SCREEN_WIDTH, -SCREEN_HEIGHT]);
    if (nearRight && nearTop)        offsets.push([-SCREEN_WIDTH, SCREEN_HEIGHT]);
    if (nearRight && nearBottom)     offsets.push([-SCREEN_WIDTH, -SCREEN_HEIGHT]);
  
    for (const [dx, dy] of offsets) {
      const wrapX = this.x + dx;
      const wrapY = this.y + dy;
      this.render(ctx, this.model, wrapX, wrapY, this.angle, this.scale);
      //this.drawCollisionCircle(ctx, wrapX, wrapY);
    }
  }
  
  // drawCollisionCircle(ctx, x, y) {
  //   ctx.save();
  //   ctx.strokeStyle = this.collided ? 'red' : 'green';
  //   ctx.beginPath();
  //   ctx.arc(x, y, this.r, 0, PI * 2);
  //   ctx.stroke();
  //   ctx.restore();
  // }  

  maxRadius() {
    return this.model.reduce((max, p) => Math.max(max, Math.sqrt(p.x ** 2 + p.y ** 2)), 0);
  }  
  
}