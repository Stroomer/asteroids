// Asteroid.mjs
import Entity from "./Entity.mjs";
import { ASTEROID_COLOR, PI, SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants.mjs";
import { randomInt } from "../utils.mjs";

export default class Asteroid extends Entity {
    constructor() {
        super();

        this.name  = `Asteroid`;
        this.x     = randomInt(0, SCREEN_WIDTH);
        this.y     = randomInt(0, SCREEN_HEIGHT);
        this.dx    = -10 + randomInt(0, 20);
        this.dy    = -10 + randomInt(0, 20);
        this.scale = randomInt(2, 5);
        this.angle = 0.0;
        this.model = this.generateModel(20, this.scale);
    }

    generateModel(vertexCount, scale) {
        const model = [];
        for (let i = 0; i < vertexCount; i++) {
            const radius = 1.0 * scale;
            const angle = (i / vertexCount) * PI * 2;
            const x = (radius * Math.sin(angle));
            const y = (radius * Math.cos(angle));
            model.push({ x, y });
        }
        return model;
    }

    update(dt) {
        super.update(dt);
    }

    draw(ctx) {
        ctx.fillStyle = ASTEROID_COLOR;
        super.draw(ctx);
    }
}

