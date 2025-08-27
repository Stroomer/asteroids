import Asteroid from '../objects/Asteroid.mjs';
import Ship from '../objects/Ship.mjs';
import Bullet from '../objects/Bullet.mjs';
import { randomInt, randomPointsWithMinimalDistance, randomSign, randomUnitVector } from '../utils/math.mjs';
import { deepClone } from '../utils/clone.mjs';
import { SCREEN_CENTER_X, SCREEN_CENTER_Y } from '../utils/constants.mjs';


export default class Factory {
  constructor() {    
    this.templates = {
      asteroids: [
        new Asteroid({ type:1, vertices:6,  radius:4,  moveSpeed:64, rotSpeed:96 }),
        new Asteroid({ type:2, vertices:8,  radius:8,  moveSpeed:32, rotSpeed:48 }),
        new Asteroid({ type:3, vertices:10, radius:16, moveSpeed:16, rotSpeed:24 }),
        new Asteroid({ type:4, vertices:14, radius:32, moveSpeed:8,  rotSpeed:12 }),
      ],
      ships: [
        new Ship({ type: 1, vertices: 3, radius: 32, color:'green' })
      ],
      bullets: [],
    };
  }
  
  createAsteroid(x, y, templates, index) {
    if (!index) index = randomInt(0, templates.length - 1);

    const asteroid  = deepClone(templates[index]);
    const vector    = randomUnitVector();

    asteroid.x      = x;
    asteroid.y      = y;
    asteroid.vector = vector;
    asteroid.vx     = vector.x * asteroid.speed;
    asteroid.vy     = vector.y * asteroid.speed;
    asteroid.rotDir = randomSign(1);
      
    return asteroid;  
  }

  createAsteroidCollection(n, minDistance) {    
    const templates = this.templates.asteroids;
    const asteroids = [];
    const points    = randomPointsWithMinimalDistance(n, minDistance);

    for (let i = 0; i < n; i++) {
      asteroids.push(this.createAsteroid(points[i].x, points[i].y, templates, null));
    }
    
    return asteroids;
  }

  randomX

  createShip(id=1, x=SCREEN_CENTER_X, y=SCREEN_CENTER_Y) {
    const templates = this.templates.ships;
    const index     = 0; // for now, always 0
    const ship      = deepClone(templates[index]);
    
    ship.id = id;
    ship.x  = x;
    ship.y  = y;
          
    return ship;
  }

  createBullet() {
    //return this.bullets.createBullet(1);
  }
}
