import { SCREEN_MARGIN, SCREEN_WIDTH, SCREEN_HEIGHT, PI } from './constants.mjs';

let uid = 0;

export function getUid() {
	return ++uid;
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hypotenusa(a, b) {
  return Math.sqrt(a*a + b*b)
}

export function radiansToDegrees(radians) {
  return radians * (180/PI);
}

export function degreesToRadians(degrees) {
  return degrees * (PI/180);
}

export function lerp(a, b, t) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

export function drawPixelLine(ctx, x0, y0, x1, y1) {
	const dx = Math.abs(x1 - x0);
	const dy = Math.abs(y1 - y0);
	const sx = x0 < x1 ? 1 : -1;
	const sy = y0 < y1 ? 1 : -1;
	let err = dx - dy;
  
	while (true) {
	  ctx.fillRect(x0, y0, 1, 1);
	  if (x0 === x1 && y0 === y1) break;
	  const e2 = 2 * err;
	  if (e2 > -dy) {
		err -= dy;
		x0 += sx;
	  }
	  if (e2 < dx) {
		err += dx;
		y0 += sy;
	  }
	}
}

export class FpsCounter {
	constructor() {
		this.fps = 0;
	}

  	update(time) {
		this.fps = Math.trunc(1 / time);
	}

	draw(context) {
		context.font = '14px Arial';
		context.fillStyle = '#00FF00';
		context.textAlign = 'right';
		context.fillText(`${this.fps}`, SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
	}
}