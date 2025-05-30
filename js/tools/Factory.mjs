// Factory.mjs
import Asteroid from '../objects/Asteroid.mjs';
import Player from '../objects/Player.mjs';
import Bullet from '../objects/Bullet.mjs';
import { ASTEROID, BULLET, PLAYER } from '../constants.mjs';

export default class Factory {
  static create(type, entities, options = {}) {
    let instance;

    switch (type) {
      case ASTEROID:
        instance = new Asteroid(options);
        break;
      case PLAYER:
        instance = new Player(options);
        break;
      case BULLET:
        instance = new Bullet(options);
        break;
      default:
        throw new Error(`Unknown type: ${type}`);
    }

    entities.push(instance);
    return instance;
  }
}







//   static DESTROY(entities, uid) {
//     const index = entities.findIndex(obj => obj.uid === uid);
//     console.log(index);
//     if (index !== -1) {
//       entities.splice(index, 1);
//     }
//   }
// }