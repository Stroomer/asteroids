// Factory.mjs
import Asteroid from './Asteroid.mjs';
import Player from './Player.mjs';
import Bullet from './Bullet.mjs';
import { ASTEROID, BULLET, PLAYER } from '../constants.mjs';

export default class Factory {
  static create(type, entities, options = {}) {
    let instance;

    switch (type) {
      case ASTEROID:
        instance = new Asteroid(options);
        break;
      case PLAYER:
        options.entities = entities;
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





// // Factory.mjs
// import { PLAYER, ASTEROID, BULLET } from '../constants.mjs';
// import Player from './Player.mjs';
// import Asteroid from './Asteroid.mjs';
// import Bullet from './Bullet.mjs';

// export default class Factory {
//   static CREATE(type, props) {
//     const { entities, amount } = props;
//     switch (type) {
//       case PLAYER:
//         for (let i = 0; i < amount; i++) {
//           props.index = i;
//           entities.push(new Player(props));
//         }
//       break;
//       case ASTEROID:
//         for (let i = 0; i < amount; i++) {
//           entities.push(new Asteroid(props));
//         }  
//       break;
//       case BULLET:
//         entities.push(new Bullet(props));
//       break;
//     }
//   }

//   static DESTROY(entities, uid) {
//     const index = entities.findIndex(obj => obj.uid === uid);
//     console.log(index);
//     if (index !== -1) {
//       entities.splice(index, 1);
//     }
//   }
// }