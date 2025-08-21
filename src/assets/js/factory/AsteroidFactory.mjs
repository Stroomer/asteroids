import Asteroid from '../objects/Asteroid.mjs';
import { randomInt, randomSign, randomX, randomY, vector2D } from '../utils/math.mjs';
import { deepClone } from '../utils/clone.mjs';
import { ASTEROID_MIN_INITIAL_DISTANCE } from '../utils/constants.mjs';

export default class AsteroidFactory {
  constructor() {
    this.asteroidTemplates = [
      AsteroidFactory.createAsteroidTemplate({ type:1, vertices:6,  radius:4,  moveSpeed:48, rotSpeed:32 }),
      AsteroidFactory.createAsteroidTemplate({ type:2, vertices:6,  radius:8,  moveSpeed:32, rotSpeed:32 }),
      AsteroidFactory.createAsteroidTemplate({ type:3, vertices:10, radius:16, moveSpeed:24, rotSpeed:16 }),
      AsteroidFactory.createAsteroidTemplate({ type:4, vertices:12, radius:32, moveSpeed:16, rotSpeed:8 }),
    ];
  }

  static createAsteroidTemplate(props) {
    return new Asteroid(props);
  }

  createRandomAsteroids(n) {
    const uniquePositions = this.getUniqueAsteroidPositions(n);
    const list = [];

    for (let i = 0; i < n; i++) {
      const randomNum = randomInt(0, this.asteroidTemplates.length - 1);
      const template = this.asteroidTemplates[randomNum];
      const clone = deepClone(template);
      
      clone.randomPosition(uniquePositions[i]);
      clone.randomRotationDirection();
      clone.randomMoveDirection();
      
      list.push(clone);  
    }    
    return list;
  }

  getUniqueAsteroidPositions(n) {
    const minDistance = ASTEROID_MIN_INITIAL_DISTANCE;
    const list = [];

    for (let i = 0; i < n; i++) {
      let valid = false;
      let x, y;
      while (!valid) {
        x = randomX();
        y = randomY();
        valid = true;
        // Check against all previously chosen asteroid-locations
        for (let j = 0; j < list.length; j++) {
          const dx = x - list[j].x;
          const dy = y - list[j].y;
          if (dx * dx + dy * dy < minDistance * minDistance) {
            valid = false;
            break;
          }
        }
      }

      list.push(vector2D(x, y));

    }
    return list;
  }
}