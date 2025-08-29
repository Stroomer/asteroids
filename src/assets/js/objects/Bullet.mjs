import Sprite from "../core/Sprite.mjs";
import { COLOR_BULLET } from "../utils/constants.mjs";
import { toRadians } from "../utils/math.mjs";

export default class Bullet extends Sprite {
  constructor(props) {
    super({ ...props, type: 'bullet' });
    
    this.color  = props.color || COLOR_BULLET;
    this.frame  = 0;

    this.model  = Sprite.generateModel({ ...props, model: Sprite.anglesToPoints([toRadians(135), toRadians(45), toRadians(315), toRadians(225)]) });
    this.buffer = Sprite.generateBuffer(this);

    //this.front = Sprite.anglesToPoints([-Math.PI/2]); 
    //this.rear  = Sprite.anglesToPoints([ Math.PI/2]); 
  }

  update(dt) {
    super.update(dt);

    // if (this.frame === 0) {
    //   console.log(`x:        ${this.x}`);
    //   console.log(`y:        ${this.y}`);
    //   console.log(`vx:       ${this.vx}`);
    //   console.log(`vy:       ${this.vy}`);
    //   console.log(`rotation: ${this.rotation}`);
    //   console.log(`vector:   [${this.vector.x},${this.vector.y}]`);
    //   console.log(`speed:    ${this.speed}`);   
    // }

    // this.frame++;  
  }

  draw(ctx) {
    super.draw(ctx);
  }
}
