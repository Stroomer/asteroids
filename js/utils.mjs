import { SCREEN_MARGIN, SCREEN_WIDTH, SCREEN_HEIGHT } from './constants.mjs';

export function resize(event) {
  const canvas = document.getElementById('screen');
  const size   = Math.min(window.innerWidth, window.innerHeight) - SCREEN_MARGIN;

  canvas.style.width = canvas.style.height = `${size}px`;
  canvas.getContext('2d').imageSmoothingEnabled = false;
}

export function renderPath(ctx, pivotX, pivotY, path, scale, color) {
  console.log('renderPath', pivotX, pivotY, path, color);
  
  let x = pivotX + (path[0] * scale); 
  let y = pivotY + (path[1] * scale);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < path.length; i += 2) {
    x = pivotX + (path[i]   * scale); 
    y = pivotY + (path[i+1] * scale);
    ctx.lineTo(x, y);  
  }
  ctx.closePath();
  ctx.stroke();
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

