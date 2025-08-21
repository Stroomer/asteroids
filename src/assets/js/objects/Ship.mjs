import Sprite from '../core/Sprite.mjs';
import { getBuffer } from '../screen/buffer.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_SHIP, COLOR_DEBUG, DEBUG } from '../utils/constants.mjs';
import { randomSign } from '../utils/math.mjs';

export default class Ship extends Sprite {
  constructor(props) {
    super(props);

    this.color  = props.color || COLOR_SHIP;
    this.model  = Sprite.generateModel({ ...props, model:[{ x: 0.0, y: -5.5 }, { x: -2.5, y: 2.5 }, { x: 2.5, y: 2.5 }] });
    this.buffer = Sprite.generateBuffer(this);

    //console.log(this.model);
    
    console.log("THIS SHIP");
    

    //this.keys = KEYBOARD[name === 'Player1' ? 0 : 1];
  }

  update(dt) {
    super.update(dt);

    // if (isKeyDown(this.keys.left))  this.angle -= PLAYER_ROT_SPD * dt;
    // if (isKeyDown(this.keys.right)) this.angle += PLAYER_ROT_SPD * dt;
    // if (isKeyDown(this.keys.up)) {                            // thrust forward
    //   this.dx +=  Math.sin(this.angle) * this.accel * dt;
    //   this.dy += -Math.cos(this.angle) * this.accel * dt;
    // } else if (isKeyDown(this.keys.down)) {                   // Reverse thrust (smooth braking or backward movement)
    //   this.dx -=  Math.sin(this.angle) * 50.0 * dt;
    //   this.dy -= -Math.cos(this.angle) * 50.0 * dt;
    // } else {
    //   this.dx *= FRICTION;
    //   this.dy *= FRICTION;
    // }

    // if (isKeyDown(this.keys.fire) && this.armed) {
    //   const { entities, x, y, dx, dy, angle } = this;
    //   Factory.create(BULLET, entities, { x, y, dx, dy, angle, offset:24 });

    //   this.armed = false;
    // }else if(isKeyUp(this.keys.fire)) {
    //   this.armed = true;
    // }

    // if (isKeyDown(this.keys.up)) {
    //   this.clamp(PLAYER_MAXSPEED);
    // } else if (isKeyDown(this.keys.down)) {
    //   this.clamp(PLAYER_MAXSPEED/4);
    // }
  }

  draw(ctx) {
    super.draw(ctx);
  }
}
