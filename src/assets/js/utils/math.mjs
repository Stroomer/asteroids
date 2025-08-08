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
