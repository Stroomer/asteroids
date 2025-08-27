import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants.mjs';

export function vector2D(x, y) {
  return { x, y };
}

export function randomUnitVector() {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomSign(num) {
  return randomInt(0, 1) === 1 ? num : -num;
}

export function randomX() {
  return randomInt(0, SCREEN_WIDTH);
}

export function randomY() {
  return randomInt(0, SCREEN_HEIGHT);
}

export function randomPick(arr) {
  return arr[randomInt(0, arr.length-1)];
}

export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

export function randomPointsWithMinimalDistance(n, minDistance, maxIterations=100) {
  const points = [];
  for (let i = 0; i < n; i++) {
    let iterations = 0;
    let valid = false;
    let x, y;
    while (!valid) {
      x = randomX();
      y = randomY();
      valid = true;
      for (let j = 0; j < points.length; j++) {
        const dx = x - points[j].x;
        const dy = y - points[j].y;
        if (dx * dx + dy * dy < minDistance * minDistance && iterations < maxIterations) {
          valid = false;
          iterations++;
          break;
        }
      }
    }
    points.push(vector2D(x, y));

  }
  return points;
}