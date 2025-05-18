import { SCREEN_MARGIN } from './constants.mjs';

export function resize(event) {
  const canvas = document.getElementById('screen');
  const ctx = canvas.getContext('2d');
  const size = Math.min(window.innerWidth, window.innerHeight) - SCREEN_MARGIN;

  canvas.style.width = canvas.style.height = `${size}px`;
  ctx.imageSmoothingEnabled = false;
  ctx.lineWidth = 8;
  ctx.strokeStyle = 'yellow';
}
