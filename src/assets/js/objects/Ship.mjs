import Sprite from '../core/Sprite.mjs';
import { getBuffer } from '../screen/buffer.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { COLOR_SHIP, COLOR_DEBUG, DEBUG, KEY_LEFT, KEY_UP, KEY_DOWN, KEY_RIGHT } from '../utils/constants.mjs';
import { randomSign, toRadians } from '../utils/math.mjs';

export default class Ship extends Sprite {
  constructor(props) {
    super({ ...props, type:'ship' });

    const points = [toRadians(-90), toRadians(120), toRadians(60)];
    for (let i = 0; i < 3; i++) {
      const angle = points[i];
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      points[i] = { x, y };
    }

    console.log(points);
       
    this.color  = props.color || COLOR_SHIP;
    this.model  = Sprite.generateModel({ ...props, model:points });
    this.buffer = Sprite.generateBuffer(this);

    //this.keys = KEYBOARD[name === 'Player1' ? 0 : 1];
  }

  update(dt, keyboard) {
    super.update(dt);

    if (keyboard.isKeyDown(KEY_UP))    console.log('up');
    if (keyboard.isKeyDown(KEY_DOWN))  console.log('down');
    if (keyboard.isKeyDown(KEY_LEFT))  console.log('left');
    if (keyboard.isKeyDown(KEY_RIGHT)) console.log('right');
    
       //this.angle -= PLAYER_ROT_SPD * dt;
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
    
    ctx.fillStyle = 'grey';
    ctx.fillRect(this.x - this.radius, this.y - this.radius ,this.width, this.height);
    
    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    

    

    super.draw(ctx);
  }
}
