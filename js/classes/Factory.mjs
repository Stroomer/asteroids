// Factory.mjs
import { PLAYER, ASTEROID, BULLET } from '../constants.mjs';
import Player from './Player.mjs';
import Asteroid from './Asteroid.mjs';
import Bullet from './Bullet.mjs';

export default class Factory {
  static CREATE(entities, type, amount, props) {
    for (let i = 0; i < amount; i++) {
      switch (type) {
        case PLAYER:    if (i === 2) return;
                        entities.push(new Player(i));
        break;
        case ASTEROID:  entities.push(new Asteroid());
        break;
        case BULLET:    entities.push(new Bullet(props));
        break;
      }
    }
  }
}