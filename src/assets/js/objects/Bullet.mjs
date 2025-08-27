import Sprite from "../core/Sprite.mjs";
import { COLOR_BULLET } from "../utils/constants.mjs";


export default class Bullet extends Sprite {
  constructor(props) {
    super({ ...props, type: 'bullet' });
    
    this.color  = props.color || COLOR_BULLET;
    
    this.model  = Sprite.generateModel({ ...props, model: Sprite.anglesToPoints([-Math.PI / 2, 2 * Math.PI / 3, Math.PI / 3]) });
    this.buffer = Sprite.generateBuffer(this);

    // this.buffer

    //this.front = Sprite.anglesToPoints([-Math.PI/2]); 
    //this.rear  = Sprite.anglesToPoints([ Math.PI/2]); 
  }

  update(dt) {
    super.update(dt);
  }

  draw(ctx) {
    // ctx.fillStyle = 'grey';
    // ctx.fillRect(this.x - this.radius, this.y - this.radius, this.width, this.height);
    
    // ctx.strokeStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // ctx.stroke();
    
    super.draw(ctx);
  }
}
