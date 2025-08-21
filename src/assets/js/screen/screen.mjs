import { COLOR_ASTEROID } from "../utils/constants.mjs";

export function getScreen() {
  const canvas = document.getElementById("screen");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  return ctx;
}

export function resize(event) {
  // const canvas = getScreen().canvas;
  // const iw = window.innerWidth;
  // const ih = window.innerHeight;
  // canvas.className = 'landscape'; //iw > ih ? 'landscape' : 'portrait'; // CRAP!
}

export function drawPixelLine(ctx, x0, y0, x1, y1, color = COLOR_ASTEROID) {
  ctx.fillStyle = color;

  x0 = x0 | 0;
  y0 = y0 | 0;
  x1 = x1 | 0;
  y1 = y1 | 0;
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
