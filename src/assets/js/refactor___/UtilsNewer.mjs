export function vec(x = 0, y = 0) {
  return { x, y };
}

export function line(ctx, x0, y0, x1, y1) {
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
