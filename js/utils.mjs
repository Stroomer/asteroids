import { SCREEN_MARGIN, SCREEN_WIDTH, SCREEN_HEIGHT, PI } from './constants.mjs';

let uid = 0;

export function getUid() {
	return ++uid;
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function distance(a, b) {
  return Math.sqrt(a*a + b*b)
}

export function radiansToDegrees(radians) {
  return radians * (180/PI);
}

export function degreesToRadians(degrees) {
  return degrees * (PI/180);
}

export function lerp(a, b, t) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

export function drawPixelLine(ctx, x0, y0, x1, y1) {
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

export function generateClusteredPoints({
	numPoints = 100,
	numClusters = 5,
	range = 320,
	clusterRadius = 30
  } = {}) {
	const points = [];
	const clusters = [];
  
	// Step 1: Generate random cluster centers
	for (let i = 0; i < numClusters; i++) {
	  clusters.push({
		x: Math.floor(Math.random() * range),
		y: Math.floor(Math.random() * range)
	  });
	}
  
	// Step 2: Assign points around random cluster centers
	for (let i = 0; i < numPoints; i++) {
	  // Pick a random cluster
	  const cluster = clusters[Math.floor(Math.random() * numClusters)];
  
	  // Random offset around the cluster center
	  const angle = Math.random() * Math.PI * 2;
	  const radius = Math.random() * clusterRadius;
  
	  const offsetX = Math.round(Math.cos(angle) * radius);
	  const offsetY = Math.round(Math.sin(angle) * radius);
  
	  // Clamp point within 0 and range
	  const x = Math.min(range, Math.max(0, cluster.x + offsetX));
	  const y = Math.min(range, Math.max(0, cluster.y + offsetY));
  
	  points.push({ x, y });
	}
  
	return points;
  }
  