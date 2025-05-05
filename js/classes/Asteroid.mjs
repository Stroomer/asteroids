// Asteroid.js
import { ASTEROID_COLOR } from "../constants.mjs";
import Entity from "./Entity.mjs";

export default class Asteroid extends Entity {
    constructor(x, y, dx, dy, size = 16) {
        super(x, y, dx, dy, size);
    }

    draw(ctx) {
        ctx.fillStyle = ASTEROID_COLOR;

        this.drawWrapped(ctx, (x, y) => {
            ctx.fillRect(Math.floor(x), Math.floor(y), this.size, this.size);
        });
    }
}
