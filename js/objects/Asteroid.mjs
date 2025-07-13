// Asteroid.mjs
import Entity from '../objects/Entity.mjs';
import { ASTEROID, ASTEROID_COLOR, PI, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
import { randomInt, getRandomVector2D } from '../utils.mjs';
import { factory } from '../tools/Factory.mjs';




export default class Asteroid {
  constructor() {
    this.base = factory.getRandomAsteroidType();
    
    console.log(this.base);
    

    this.x        = SCREEN_WIDTH / 2;  //randomInt(0, SCREEN_WIDTH);
    this.y        = SCREEN_HEIGHT / 2;  //randomInt(0, SCREEN_HEIGHT);
    this.speed    = 10;
    
    const vector = getRandomVector2D(this.speed);

    this.velX     = vector.x;
    this.velY     = vector.y;
    this.rotSpeed = 30; // degrees per second
    this.rotation = 0;
    this.model    = this.base.models[0];
    this.image    = this.base.frames[0];
    this.collided = false;
  }
  
  update(dt) {
    this.x = (this.x + this.velX * dt + SCREEN_WIDTH)  % SCREEN_WIDTH;
    this.y = (this.y + this.velY * dt + SCREEN_HEIGHT) % SCREEN_HEIGHT;
    
    this.rotation = (this.rotation + this.rotSpeed * dt) % 360;
    
    this.image = this.base.frames[this.rotation | 0];
    this.model = this.base.models[this.rotation | 0];

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