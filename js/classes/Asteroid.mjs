// Asteroid.mjs
import Entity from "./Entity.mjs";
import { ASTEROID_COLOR, PI } from "../constants.mjs";

export default class Asteroid extends Entity {
    constructor({ name, x, y, dx, dy, scale, angle, debug }) {
        super({ name, x, y, dx, dy, scale, angle });

        this.debug = debug;
        this.model = this.generateModel({ vertexCount:20, scale });
    }

    generateModel({ vertexCount, scale }) {
        const model = [];
        for (let i = 0; i < vertexCount; i++) {
            const radius = 1.0 * scale;
            const angle = (i / vertexCount) * PI * 2;
            const x = radius * Math.sin(angle);
            const y = radius * Math.cos(angle);
            model.push({ x, y });
        }
        return model;
    }

    update(dt) {
        console.log('asteroid.update()');
        

        super.update(dt);
    }

    draw(ctx) {
        ctx.fillStyle = ASTEROID_COLOR;
        super.draw(ctx);
    }
}

