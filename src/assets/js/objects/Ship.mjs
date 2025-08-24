import Sprite from '../core/Sprite.mjs';
import { COLOR_SHIP, KEY_LEFT, KEY_UP, KEY_DOWN, KEY_RIGHT } from '../utils/constants.mjs';
import { toRadians } from '../utils/math.mjs';

export default class Ship extends Sprite {
  constructor(props) {
    super({ ...props, type:'ship' });
           
    this.color  = props.color || COLOR_SHIP;
    this.model  = Sprite.generateModel({ ...props, model:this.getCoordinates([toRadians(-90), toRadians(120), toRadians(60)]) });
    this.buffer = Sprite.generateBuffer(this);

    this.rear  = this.getCoordinates([toRadians(-90)]); 
    this.front = this.getCoordinates([toRadians(270)]); 
  }

  getCoordinates(points) {
    for (let i = 0; i < points.length; i++) {
      const angle = points[i];
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      points[i] = { x, y };
    }
    return points;
  }

  update(dt, keyboard) {
    if (keyboard.isKeyDown(KEY_UP))         this.thrust(1);
    else if (keyboard.isKeyDown(KEY_DOWN))  this.thrust(-1);
      
    if (keyboard.isKeyDown(KEY_LEFT))       this.rotate(-1);
    else if (keyboard.isKeyDown(KEY_RIGHT)) this.rotate(1);
    else                                    this.rotate(0);

    super.update(dt);

    // calculate positions for front/back to init bullets and (thrust)fire
    //this.front = 
    //this.back  = 
    
    // console.log(this.rotation);
    
  }

  draw(ctx) {
    // draw temp RECT-fill
    ctx.fillStyle = 'grey';
    ctx.fillRect(this.x - this.radius, this.y - this.radius ,this.width, this.height);
    
    // draw temp ARC-stroke
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // draw Sprite
    super.draw(ctx);
  }

  thrust(direction) {
    console.log('thrust');
  }

  rotate(direction) {
    this.rotDir = direction;
    this.rotSpeed = 180;
    //console.log(`rotate in direction ${direction}`);    
  }
}



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