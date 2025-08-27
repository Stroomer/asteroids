import Bullet from '../objects/Bullet.mjs';
import { randomInt, randomSign, randomUnitVector, randomX, randomY, vector2D } from '../utils/math.mjs';

export default class BulletFactory {
  constructor() {
    this.bulletTemplates = [BulletFactory.createBulletTemplate({ type: 1, moveSpeed: 24, color: 'orange' })];
  }

  static createBulletTemplate(props) {
    return new Bullet(props);
  }

  createBullet() {
    const template = this.bulletTemplates[0];
    const clone = deepClone(template);

    clone.x = SCREEN_CENTER_X;
    clone.y = SCREEN_CENTER_Y;
    clone.vx = clone.vy = 0;

    return clone;
  }
}
