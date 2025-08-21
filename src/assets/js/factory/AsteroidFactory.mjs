import Asteroid from '../objects/Asteroid.mjs';
import { randomInt, randomSign, randomX, randomY } from '../utils/math.mjs';
import { COLOR_ASTEROID, DEBUG, SPRITE_TEST } from '../utils/constants.mjs';
import { deepClone } from '../utils/clone.mjs';

export default class AsteroidFactory {
  constructor() {
    this.asteroidTemplates = [
      //AsteroidFactory.createAsteroidTemplate({ type:1, vertices:6,  radius:5,   moveSpeed:2, rotSpeed:2 }),
      //AsteroidFactory.createAsteroidTemplate({ type:2, vertices:8,  radius:8,   moveSpeed:2, rotSpeed:2 }),
      //AsteroidFactory.createAsteroidTemplate({ type:3, vertices:10, radius:12,  moveSpeed:2, rotSpeed:2 }),
      //AsteroidFactory.createAsteroidTemplate({ type:4, vertices:12, radius:17,  moveSpeed:2, rotSpeed:2 }),
      AsteroidFactory.createAsteroidTemplate({ type:5, vertices:14, radius:23,  moveSpeed:2, rotSpeed:2 }),
      //AsteroidFactory.createAsteroidTemplate({ type:6, vertices:16, radius:32,  moveSpeed:2, rotSpeed:2  }),

      // AsteroidFactory.createAsteroidTemplate({ type:1, vertices:6,  radius:5,   moveSpeed:40, rotSpeed:64 }),
      // AsteroidFactory.createAsteroidTemplate({ type:2, vertices:8,  radius:8,   moveSpeed:30, rotSpeed:48 }),
      // AsteroidFactory.createAsteroidTemplate({ type:3, vertices:10, radius:12,  moveSpeed:20, rotSpeed:32 }),
      // AsteroidFactory.createAsteroidTemplate({ type:4, vertices:12, radius:17,  moveSpeed:15, rotSpeed:24 }),
      // AsteroidFactory.createAsteroidTemplate({ type:5, vertices:14, radius:23,  moveSpeed:10, rotSpeed:16 }),
      // AsteroidFactory.createAsteroidTemplate({ type:6, vertices:16, radius:32,  moveSpeed:5,  rotSpeed:8  }),
    ];
  }

  static createAsteroidTemplate(props) {
    const asteroid = new Asteroid(props);
    asteroid.model  = Asteroid.generateModel(props);
    asteroid.buffer  = Asteroid.generateBuffer(asteroid);

    return asteroid;
  }

  createRandomAsteroids(n) {
    const list = [];
    for (let i = 0; i < n; i++) {
      const randomNum   = randomInt(0, this.asteroidTemplates.length - 1);
      const randomAsteroid = this.asteroidTemplates[randomNum];
      const clone = deepClone(randomAsteroid);
      
      // console.log(randomAsteroid.width, randomAsteroid.height);
      
      
      list.push(clone);  
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