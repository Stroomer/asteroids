import Ship from '../objects/Ship.mjs';
import { SCREEN_CENTER_X, SCREEN_CENTER_Y } from '../utils/constants.mjs';

export default class ShipFactory {
  constructor() {}

  createShip() {
    console.log('CREATE SHIPPIE');

    // const { type, vertices, radius, min = 0.8, max = 1.0 } = props;

    const ship = new Ship({ x:SCREEN_CENTER_X, y:SCREEN_CENTER_Y, vertices:6, radius:15, moveSpeed:0, rotSpeed:0, model:[{x:0.0, y:-5.5}, {x:-2.5, y:2.5}, {x:2.5,y:2.5}]});
    
    // const model = ship.model;
    // const baseModel = [];
    // const models = [];
    // const images = [];
    // // Generate points for base model (at angle 0°)
    // for (let i = 0; i < model.length; i++) {
      
    //   const angle = (i / vertices) * Math.PI * 2;
    //   const variation = min + Math.random() * (max - min);
    //   const x = radius * variation * Math.cos(angle);
    //   const y = radius * variation * Math.sin(angle);
    //   baseModel.push({ x, y });
    // }

    /*  
    // Generate points for all models (rotated from angle 0° to 359°)
    for (let deg = 0; deg < 360; deg++) {
      const rad = deg * (Math.PI / 180);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const rotModel = [];
      for (let i = 0; i < baseModel.length; i++) {
        const pnt = baseModel[i];
        const x = pnt.x * cos - pnt.y * sin;
        const y = pnt.x * sin + pnt.y * cos;
        rotModel.push({ x, y });
      }
      models.push(rotModel);
    }
    // Render all models to canvas-buffer (for all rotated models) and save sprites inside Asteroid Object
    for (let deg = 0; deg < 360; deg++) {
      const id = `asteroid_type${type}_deg${deg}`;
      const model = models[deg];
      const width = radius * 2;
      const height = radius * 2;
      const color = COLOR_ASTEROID;
      const display = DEBUG ? true : false;
      const ctx = getBuffer({ id, width, height, color, display });
      for (let i = 0; i < model.length; i++) {   
        const p1 = model[i];
        const p2 = model[(i + 1) % model.length];        
        const x1 = p1.x + radius;
        const y1 = p1.y + radius;
        const x2 = p2.x + radius;
        const y2 = p2.y + radius;
        drawPixelLine(ctx, x1, y1, x2, y2);
      }
      images.push(ctx);
      //if (DEBUG) document.body.appendChild(ctx.canvas);            
    }
    ship.models = models;
    ship.images = images;

    */

    //return ship;
  }
}
