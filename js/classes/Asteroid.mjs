// Asteroid.mjs
import Entity from "./Entity.mjs";
import { ASTEROID_COLOR } from "../constants.mjs";

export default class Asteroid extends Entity {
    constructor(x, y, dx, dy, size = 16) {
        super(x, y, dx, dy, size);
    }

    render(ctx, x, y) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(Math.floor(x), Math.floor(y), this.size, this.size);
    }
}

