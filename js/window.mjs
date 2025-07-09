import { SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_MARGIN } from './constants.mjs';

export function resize(event) {
  const canvas = document.getElementById('screen');
  const ctx = canvas.getContext('2d');
  const iw = window.innerWidth;
  const ih = window.innerHeight;

  canvas.className = 'landscape'; //iw > ih ? 'landscape' : 'portrait'; // CRAP!

  ctx.imageSmoothingEnabled = false;
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'yellow';
}
