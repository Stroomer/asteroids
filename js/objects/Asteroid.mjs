// Asteroid.mjs
import Entity from '../objects/Entity.mjs';
import { ASTEROID, ASTEROID_COLOR, PI, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
import { randomInt, drawPixelLine } from '../utils.mjs';
import { factory } from '../tools/Factory.mjs';




export default class Asteroid {
  constructor() {
    this.base        = factory.asteroid1;

    this.x           = SCREEN_WIDTH / 2;  //randomInt(0, SCREEN_WIDTH);
    this.y           = SCREEN_HEIGHT / 2;  //randomInt(0, SCREEN_HEIGHT);
    this.dx          = 0;  //-10 + randomInt(0, 20);
    this.dy          = 0;  //-10 + randomInt(0, 20);
    this.size        = 5;  //randomInt(2, 5);
    this.angle       = 0.0;
    this.rotation    = 0;
    this.model       = this.base.models[0];
    this.image       = this.base.frames[0];
    
    //console.log();
    

    this.r           = this.size;  // this.maxRadius() * 
    this.collided = false;
    
    Asteroid.MODELS = [];
  }
  
  update(dt) {
    this.x = (this.x + this.dx * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.dy * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    
    this.rotation = (this.rotation + 1) % 360;
    
    this.image = this.base.frames[this.rotation];
    this.model = this.base.models[this.rotation];

    //console.log(this.rotation);


    
  }

  draw(ctx) {
    // ctx.fillStyle = ASTEROID_COLOR;
    
    // const model  = this.model[this.rotation | 0]
    // const points = model.length;
    // for (let i = 0; i < points; i++) {
    //   const vertex = model[i];
    //   const next   = model[(i + 1) % points];       
    //   drawPixelLine(ctx, this.x + vertex.x, this.y + vertex.y, this.x + next.x, this.y + next.y);
    // }
    
    ctx.drawImage(this.image, this.x, this.y);
    
  }
}