import Asteroid from '../objects/Asteroid.mjs';
import { getBuffer } from '../screen/buffer.mjs';
import { drawPixelLine } from '../screen/screen.mjs';
import { randomInt, randomX, randomY } from '../utils/math.mjs';
import { COLOR_ASTEROID, DEBUG, SPRITE_TEST } from '../utils/constants.mjs';

export default class AsteroidFactory {
  constructor() {
    this.asteroidTypes = [this.createAsteroidType(0, 2), this.createAsteroidType(1, 2), this.createAsteroidType(2, 2), this.createAsteroidType(3, 2), this.createAsteroidType(4, 2), this.createAsteroidType(5, 2)];
  }

  createRandomAsteroidsList(n) {
    const randomAsteroidList = [];
    for (let i = 0; i < n; i++) {
      const randomType      = randomInt(0, this.asteroidTypes.length - 1);
      const randomVariation = randomInt(0, this.asteroidTypes[randomType].length - 1);
      const randomAsteroid  = this.asteroidTypes[randomType][randomVariation];
      randomAsteroid.x = randomX();
      randomAsteroid.y = randomY();
      randomAsteroidList.push(randomAsteroid);
    }
    return randomAsteroidList;
  }

  createAsteroidType(type, seed) {
    const result = [];
    for (let i = 0; i < seed; i++) {
      switch (type) {
        case 0: result.push(this.createAsteroid({ type, vertices:6,  radius:5,  moveSpeed:40, rotSpeed:64 })); break;
        case 1: result.push(this.createAsteroid({ type, vertices:8,  radius:8,  moveSpeed:30, rotSpeed:48 })); break;
        case 2: result.push(this.createAsteroid({ type, vertices:10, radius:12, moveSpeed:20, rotSpeed:32 })); break;
        case 3: result.push(this.createAsteroid({ type, vertices:12, radius:17, moveSpeed:15, rotSpeed:24 })); break;
        case 4: result.push(this.createAsteroid({ type, vertices:14, radius:23, moveSpeed:10, rotSpeed:16 })); break;
        case 5: result.push(this.createAsteroid({ type, vertices:16, radius:32, moveSpeed:5,  rotSpeed:8  })); break;
      }
    }
    return result;
  }

  createAsteroid(props) {
    const { type, vertices, radius, min = 0.8, max = 1.0 } = props;
    const asteroid = new Asteroid(props);

    asteroid.models = Asteroid.generateModels(vertices, radius, min, max);
    asteroid.images = Asteroid.generateSprites(type, asteroid.models, radius, COLOR_ASTEROID, DEBUG && SPRITE_TEST);
    
    return asteroid;
  }
}
