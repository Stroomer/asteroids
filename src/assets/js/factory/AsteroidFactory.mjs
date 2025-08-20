import Asteroid from '../objects/Asteroid.mjs';
import { deepClone, randomInt, randomSign, randomX, randomY } from '../utils/math.mjs';
import { COLOR_ASTEROID, DEBUG, SPRITE_TEST } from '../utils/constants.mjs';

export default class AsteroidFactory {
  constructor() {
    this.asteroids = [
      // AsteroidFactory.createAsteroid({ type:1, vertices:6,  radius:5,   moveSpeed:40, rotSpeed:64 }),
      // AsteroidFactory.createAsteroid({ type:2, vertices:8,  radius:8,   moveSpeed:30, rotSpeed:48 }),
      // AsteroidFactory.createAsteroid({ type:3, vertices:10, radius:12,  moveSpeed:20, rotSpeed:32 }),
      // AsteroidFactory.createAsteroid({ type:4, vertices:12, radius:17,  moveSpeed:15, rotSpeed:24 }),
      AsteroidFactory.createAsteroid({ type:5, vertices:14, radius:23,  moveSpeed:10, rotSpeed:16 }),
      AsteroidFactory.createAsteroid({ type:6, vertices:16, radius:32,  moveSpeed:5,  rotSpeed:8  }),
    ];
  }

  static createAsteroid(props) {
    const asteroid = new Asteroid(props);

    asteroid.model  = Asteroid.generateModel(props);
    asteroid.buffer  = Asteroid.generateBuffer(asteroid);

    return asteroid;
  }

  createRandomAsteroidsList(n) {
    const list = [];
    for (let i = 0; i < 10; i++) {
      const a = new Asteroid(this.asteroids[0]);
      a.randomize();

      list.push( a );  
    }
    
    return list;
  }
}


//   const list = [];
//   const minDistance = 5;

//   for (let i = 0; i < n; i++) {
//     const randomType      = randomInt(0, this.asteroidTypes.length - 1);
//     const randomVariation = randomInt(0, this.asteroidTypes[randomType].length - 1);
//     const randomAsteroid  = { ...this.asteroidTypes[randomType][randomVariation] }; // clone

//     let valid = false;
//     let x, y;

//     while (!valid) {
//       x = randomX();
//       y = randomY();
//       valid = true;

//       // Check against all previously placed asteroids
//       for (let j = 0; j < list.length; j++) {
//         const dx = x - list[j].x;
//         const dy = y - list[j].y;
//         if (dx * dx + dy * dy < minDistance * minDistance) {
//           valid = false;
//           break;
//         }
//       }
//     }

//     randomAsteroid.x = x;
//     randomAsteroid.y = y;
//     list.push(randomAsteroid);
//   }

//   return list;