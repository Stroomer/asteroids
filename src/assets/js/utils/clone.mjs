// Generic deep copy for any value
export function deepCopy(value) {
  if (value === null || typeof value !== 'object') return value;

  if (Array.isArray(value)) {
    return value.map(deepCopy);
  }
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  if (value instanceof Map) {
    return new Map([...value.entries()].map(([k, v]) => [deepCopy(k), deepCopy(v)]));
  }
  if (value instanceof Set) {
    return new Set([...value].map(deepCopy));
  }

  // --- Canvas handling ---
  if (value instanceof HTMLCanvasElement) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = value.width;
    newCanvas.height = value.height;
    const ctx = newCanvas.getContext('2d');
    ctx.drawImage(value, 0, 0);
    return newCanvas;
  }

  if (value instanceof OffscreenCanvas) {
    const newCanvas = new OffscreenCanvas(value.width, value.height);
    const ctx = newCanvas.getContext('2d');
    ctx.drawImage(value, 0, 0);
    return newCanvas;
  }

  if (value instanceof CanvasRenderingContext2D) {
    const oldCanvas = value.canvas;
    const newCanvas = deepCopy(oldCanvas); // handled above
    return newCanvas.getContext('2d');
  }

  // --- ImageBitmap handling ---
  if (value instanceof ImageBitmap) {
    // Draw bitmap into a canvas, then create a new bitmap from it
    const canvas = new OffscreenCanvas(value.width, value.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(value, 0, 0);
    return canvas.transferToImageBitmap();
  }

  // --- Fallback: plain object or custom object ---
  const objClone = Object.create(Object.getPrototypeOf(value));
  for (const key of Reflect.ownKeys(value)) {
    objClone[key] = deepCopy(value[key]);
  }
  return objClone;
}

// Clone class instances (preserve prototype + copy properties)
export function deepClone(instance) {
  if (instance === null || typeof instance !== 'object') {
    throw new TypeError('deepClone expects a class instance (object).');
  }
  const clone = Object.create(Object.getPrototypeOf(instance));
  for (const key of Reflect.ownKeys(instance)) {
    clone[key] = deepCopy(instance[key]);
  }
  return clone;
}

// Testing the deepClone /////////////////////////////////////////////////////////
// class Person {
//   constructor(name, birthday) {
//     this.name = name;
//     this.birthday = birthday;
//   }
//   greet() {
//     return `Hi, I'm ${this.name}`;
//   }
// }

// const p1 = new Person("Alice", new Date("2000-01-01"));
// const p2 = deepClone(p1);

// console.log(p2.greet()); // "Hi, I'm Alice"
// console.log(p2.birthday instanceof Date); // true
// console.log(p1 !== p2); // true
// Testing the deepClone /////////////////////////////////////////////////////////
