// Factory.mjs
import { PLAYER, ASTEROID, BULLET } from '../constants.mjs';
import Player from './Player.mjs';
import Asteroid from './Asteroid.mjs';
import Bullet from './Bullet.mjs';

export default class Factory {
  static CREATE(entities, type, amount=1, props=null) {
    switch (type) {
      case PLAYER:    for (let i = 0; i < amount; i++) entities.push(new Player(i+1, entities));
      break;
      case ASTEROID:  for(let i = 0; i < amount; i++)  entities.push(new Asteroid());
      break;
      case BULLET:    entities.push(new Bullet(props));
      break;
    }
    
  }
}