// Asteroid.mjs
import Entity from './Entity.mjs';
import { BULLET, BULLET_MAXSPEED, FRICTION, KEYBOARD, PLAYER, PLAYER_COLOR, PLAYER_MAXSPEED, PLAYER_ROT_SPD, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.mjs';
import { isKeyDown, isKeyUp } from '../keyboard.mjs';
import Factory from './Factory.mjs';
import { hypotenusa, lerp } from '../utils.mjs';

export default class Player extends Entity {
  constructor({ name, mplayer, entities }) {
    super();

    this.name  = name;
    this.type  = PLAYER;
    this.x     = SCREEN_WIDTH  / 4 * (!mplayer ? 2 : (name === "Player1" ? 3 : 1));   
    this.y     = SCREEN_HEIGHT / 2;
    this.dx    = 0.0;
    this.dy    = 0.0;
    this.scale = 4;
    this.angle = 0.0;
    this.accel = 200.0;
    this.model = [{ x: 0.0, y: -5.5 }, { x: -2.5, y: 2.5 }, { x: 2.5, y: 2.5 }];
    this.keys  = KEYBOARD[(name === "Player1" ? 0 : 1)];
    this.armed = true;
    this.entities = entities;
  }

  update(dt) {
    if (isKeyDown(this.keys.left))  this.angle -= PLAYER_ROT_SPD * dt;
    if (isKeyDown(this.keys.right)) this.angle += PLAYER_ROT_SPD * dt;    
    if (isKeyDown(this.keys.up)) {                            // thrust forward
      this.dx +=  Math.sin(this.angle) * this.accel * dt;
      this.dy += -Math.cos(this.angle) * this.accel * dt;
    } else if (isKeyDown(this.keys.down)) {                   // Reverse thrust (smooth braking or backward movement)      
      this.dx -=  Math.sin(this.angle) * 50.0 * dt;
      this.dy -= -Math.cos(this.angle) * 50.0 * dt;
    } else {
      this.dx *= FRICTION;
      this.dy *= FRICTION;      
    }
  
    if (isKeyDown(this.keys.fire) && this.armed) {      
      const { entities, x, y, dx, dy, angle } = this;
      Factory.create(BULLET, entities, { x, y, dx, dy, angle, offset:24 });

      this.armed = false;
    }else if(isKeyUp(this.keys.fire)) {
      this.armed = true;
    }
    
    if (isKeyDown(this.keys.up)) {
      this.clamp(PLAYER_MAXSPEED);   
    } else if (isKeyDown(this.keys.down)) {
      this.clamp(PLAYER_MAXSPEED/4);   
    }

    super.update(dt);
  }

  clamp(max) {
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    
    if (speed > max) {
      const scale = max / speed;
      this.dx *= scale;
      this.dy *= scale;
      this.speed = speed * scale;
      console.log(`orig_speed: ${speed}  clamped_speed: ${this.speed}`);
    } 
  }

  draw(ctx) {
    ctx.fillStyle = PLAYER_COLOR;
    super.draw(ctx);
  }
}