import Ship from '../objects/Ship.mjs';
import { deepClone } from '../utils/clone.mjs';
import { SCREEN_CENTER_X, SCREEN_CENTER_Y } from '../utils/constants.mjs';

export default class ShipFactory {
  constructor() {
    this.shipTemplates = [
      ShipFactory.createShipTemplate({ type: 1, vertices: 3, radius: 32 }),
    ];
  }

  static createShipTemplate(props) {
      return new Ship(props);
    }

  createShip() {
    const template = this.shipTemplates[0];
    const clone = deepClone(template);

    clone.x = SCREEN_CENTER_X;
    clone.y = SCREEN_CENTER_Y;  
    clone.vx = clone.vy = 0;
    
    return clone;
  }
}
