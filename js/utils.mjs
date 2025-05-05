import { SCREEN_MARGIN, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';

export function resize(event) {
  const canvas = document.getElementById('screen');
  const size   = Math.min(window.innerWidth, window.innerHeight) - SCREEN_MARGIN;

  canvas.style.width = canvas.style.height = `${size}px`;
}