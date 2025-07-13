import { SCREEN_MARGIN, SCREEN_WIDTH, SCREEN_HEIGHT, PI } from './constants.mjs';

let uid = 0;

export function getUid() {
	return ++uid;
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomAsteroidDirection(seed) {
	const result = -seed + randomInt(0, 2 * seed);
	return result === 0 ? randomAsteroidDirection(seed) : result;
}

export function getCanvas(id='', width=100, height=100, color='white', display=false) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	canvas.id = id;
	canvas.width = width;
	canvas.height = height;
	canvas.style.display = display ? 'block' : 'none';

	ctx.imageSmoothingEnabled = false;
	ctx.fillStyle = color;

	return ctx;
}

export function getVector2D(angle, magnitude = 1) {
    return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude
    };
}

export function getRandomVector2D(magnitude = 1) {
    const angle = Math.random() * 2 * Math.PI;
	return getVector2D(angle, magnitude);
}

export function getDistanceSquared(x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;

	return dx * dx + dy * dy;
}

export function getDistance(x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;

	return Math.sqrt(dx * dx + dy * dy);
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

// export function polygonsIntersect(polygonA, polygonB) {
// 	const polygons = [polygonA, polygonB];
// 	let i, j;
  
// 	for (let p = 0; p < polygons.length; p++) {
// 	  const polygon = polygons[p];
  
// 	  for (i = 0; i < polygon.length; i++) {
// 		const current = polygon[i];
// 		const next = polygon[(i + 1) % polygon.length];
  
// 		const edge = { x: next.x - current.x, y: next.y - current.y };
// 		const axis = { x: -edge.y, y: edge.x }; // Normal vector
  
// 		let minA = Infinity, maxA = -Infinity;
// 		for (j = 0; j < polygonA.length; j++) {
// 		  const proj = polygonA[j].x * axis.x + polygonA[j].y * axis.y;
// 		  minA = Math.min(minA, proj);
// 		  maxA = Math.max(maxA, proj);
// 		}
  
// 		let minB = Infinity, maxB = -Infinity;
// 		for (j = 0; j < polygonB.length; j++) {
// 		  const proj = polygonB[j].x * axis.x + polygonB[j].y * axis.y;
// 		  minB = Math.min(minB, proj);
// 		  maxB = Math.max(maxB, proj);
// 		}
  
// 		if (maxA < minB || maxB < minA) {
// 		  return false; // Separating axis found, no collision
// 		}
// 	  }
// 	}
  
// 	return true; // No separating axis found, polygons intersect
// }

// export function generateClusteredPoints({
// 	numPoints = 100,
// 	numClusters = 5,
// 	range = 320,
// 	clusterRadius = 30
//   } = {}) {
// 	const points = [];
// 	const clusters = [];
  
// 	// Step 1: Generate random cluster centers
// 	for (let i = 0; i < numClusters; i++) {
// 	  clusters.push({
// 		x: Math.floor(Math.random() * range),
// 		y: Math.floor(Math.random() * range)
// 	  });
// 	}
  
// 	// Step 2: Assign points around random cluster centers
// 	for (let i = 0; i < numPoints; i++) {
// 	  // Pick a random cluster
// 	  const cluster = clusters[Math.floor(Math.random() * numClusters)];
  
// 	  // Random offset around the cluster center
// 	  const angle = Math.random() * Math.PI * 2;
// 	  const radius = Math.random() * clusterRadius;
  
// 	  const offsetX = Math.round(Math.cos(angle) * radius);
// 	  const offsetY = Math.round(Math.sin(angle) * radius);
  
// 	  // Clamp point within 0 and range
// 	  const x = Math.min(range, Math.max(0, cluster.x + offsetX));
// 	  const y = Math.min(range, Math.max(0, cluster.y + offsetY));
  
// 	  points.push({ x, y });
// 	}
  
// 	return points;
//   }
  