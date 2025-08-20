export function getBuffer(id, width, height, color, display) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = display ? 'block' : 'none';

  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = color;

  if (display) {
    document.body.appendChild(canvas);
  }

  return ctx;
}
