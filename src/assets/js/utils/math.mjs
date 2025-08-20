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

export function deepClone(instance) {
  // Preserve prototype
  const clone = Object.create(Object.getPrototypeOf(instance));
  // Recursively copy properties
  function deepCopy(value) {
    if (value === null || typeof value !== 'object') return value; // primitive value
    if (Array.isArray(value))                        return value.map(deepCopy);
    if (value instanceof Date)                       return new Date(value.getTime());
    if (value instanceof Map)                        return new Map([...value.entries()].map(([k, v]) => [deepCopy(k), deepCopy(v)]));
    if (value instanceof Set)                        return new Set([...value].map(deepCopy));
    // Clone plain object or custom object
    const objClone = Object.create(Object.getPrototypeOf(value));
    for (const key of Reflect.ownKeys(value)) {
      objClone[key] = deepCopy(value[key]);
    }
    return objClone;
  }
  // Copy own properties of the instance
  for (const key of Reflect.ownKeys(instance)) {
    clone[key] = deepCopy(instance[key]);
  }
  return clone;
}
