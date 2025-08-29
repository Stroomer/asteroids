import Sprite from '../core/Sprite.mjs';
import { bullets, factory } from '../main.mjs';
import { COLOR_SHIP, KEY_LEFT, KEY_UP, KEY_DOWN, KEY_RIGHT, KEY_SPACE, SCREEN_CENTER_X, SCREEN_CENTER_Y } from '../utils/constants.mjs';
import { toRadians } from '../utils/math.mjs';

export default class Ship extends Sprite {
  constructor(props) {
    super({ ...props, type: 'ship' });
    this.color  = props.color || COLOR_SHIP;
    this.model  = Sprite.generateModel({ ...props, model: Sprite.anglesToPoints([-Math.PI/2, 2*Math.PI/3, Math.PI/3]) });
    this.buffer = Sprite.generateBuffer(this);

    this.front = Sprite.anglesToPoints([-Math.PI/2]); 
    this.rear  = Sprite.anglesToPoints([Math.PI / 2]);
    
    this.firing = false;
  }

  update(dt, keyboard) {
    if (keyboard.isKeyDown(KEY_UP))         this.thrust(1);
    else if (keyboard.isKeyDown(KEY_DOWN))  this.thrust(-1);

    if (keyboard.isKeyDown(KEY_LEFT))       this.rotate(-1);
    else if (keyboard.isKeyDown(KEY_RIGHT)) this.rotate(1);
    else                                    this.rotate(0);

    if (keyboard.isKeyDown(KEY_SPACE))      this.fire();
    else                                    this.firing = false;

    super.update(dt);

    const rotDeg = this.rotation | 0;
    this.front = Sprite.anglesToPoints([toRadians(270 + rotDeg)]);
    this.rear  = Sprite.anglesToPoints([toRadians(90  + rotDeg)]);
  }

  draw(ctx) {
    super.draw(ctx);

    //this.drawMarker(ctx, this.front[0], 'purple');
    //this.drawMarker(ctx, this.rear[0],  'yellow');
  }

  thrust(direction) {
    // TODO: adjust vx/vy with acceleration
  }

  rotate(direction) {
    this.rotDir = direction;
    this.rotSpeed = 180;
  }

  fire() {
    if (!this.firing) {
      this.firing = true;
  
      const { x, y } = this.front[0];
      const px = this.x + (x * this.radius);
      const py = this.y + (y * this.radius);
      const bullet = factory.createBullet(px, py, this.front[0]);

      bullets.push(bullet);
    }
  }
}