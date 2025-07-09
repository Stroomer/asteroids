class Point {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;
    this.data = data;
  }

  // Skips Math.sqrt for faster comparisons
  sqDistanceFrom(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return dx * dx + dy * dy;
  }

  // Pythagorus: a^2 = b^2 + c^2
  distanceFrom(other) {
    return Math.sqrt(this.sqDistanceFrom(other));
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.left = x - w / 2;
    this.right = x + w / 2;
    this.top = y - h / 2;
    this.bottom = y + h / 2;
  }

  contains(point) {
    return this.left <= point.x && point.x <= this.right && this.top <= point.y && point.y <= this.bottom;
  }

  intersects(range) {
    return !(this.right < range.left || range.right < this.left || this.bottom < range.top || range.bottom < this.top);
  }

  subdivide(quadrant) {
    const hw = this.w / 2;
    const hh = this.h / 2;

    switch (quadrant) {
      case 'ne':
        return new Rectangle(this.x + hw, this.y - hh, hw, hh);
      case 'nw':
        return new Rectangle(this.x - hw, this.y - hh, hw, hh);
      case 'se':
        return new Rectangle(this.x + hw, this.y + hh, hw, hh);
      case 'sw':
        return new Rectangle(this.x - hw, this.y + hh, hw, hh);
      default:
        throw new Error(`Invalid quadrant: ${quadrant}`);
    }
  }

  xDistanceFrom(point) {
    if (this.left <= point.x && point.x <= this.right) {
      return 0;
    }

    return Math.min(Math.abs(point.x - this.left), Math.abs(point.x - this.right));
  }

  yDistanceFrom(point) {
    if (this.top <= point.y && point.y <= this.bottom) {
      return 0;
    }

    return Math.min(Math.abs(point.y - this.top), Math.abs(point.y - this.bottom));
  }

  // Skips Math.sqrt for faster comparisons
  sqDistanceFrom(point) {
    const dx = this.xDistanceFrom(point);
    const dy = this.yDistanceFrom(point);

    return dx * dx + dy * dy;
  }

  // Pythagorus: a^2 = b^2 + c^2
  distanceFrom(point) {
    return Math.sqrt(this.sqDistanceFrom(point));
  }
}

// circle class for a circle shaped query
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
    return d <= this.rSquared;
  }

  intersects(range) {
    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);

    // radius of the circle
    let r = this.r;
    let w = range.w / 2;
    let h = range.h / 2;
    let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    // no intersection
    if (xDist > r + w || yDist > r + h) return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h) return true;

    // intersection on the edge of the circle
    return edges <= this.rSquared;
  }
}

class QuadTree {
  static DEFAULT_CAPACITY = 4;
  static MAX_DEPTH = 8;

  constructor(boundary, capacity = QuadTree.DEFAULT_CAPACITY, depth = 0) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
    this.depth = depth;
  }

  subdivide() {
    this.northeast = new QuadTree(this.boundary.subdivide('ne'), this.capacity, this.depth + 1);
    this.northwest = new QuadTree(this.boundary.subdivide('nw'), this.capacity, this.depth + 1);
    this.southeast = new QuadTree(this.boundary.subdivide('se'), this.capacity, this.depth + 1);
    this.southwest = new QuadTree(this.boundary.subdivide('sw'), this.capacity, this.depth + 1);
    this.divided = true;

    for (const point of this.points) {
      this.northeast.insert(point) || this.northwest.insert(point) || this.southeast.insert(point) || this.southwest.insert(point);
    }

    this.points = [];
  }

  insert(point) {
    if (!this.boundary.contains(point)) return false;

    // Already subdivided → insert into children
    if (this.divided) {
      return this.northeast.insert(point) || this.northwest.insert(point) || this.southeast.insert(point) || this.southwest.insert(point);
    }

    this.points.push(point);

    if (this.points.length > this.capacity && this.depth < QuadTree.MAX_DEPTH) {
      this.subdivide();
    }

    return true;
  }

  query(range, found) {
    if (!found) {
      found = [];
    }

    if (!range.intersects(this.boundary)) {
      return found;
    }

    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
      return found;
    }

    for (const p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }

    return found;
  }

  show(ctx) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    // Convert center x/y to top-left corner
    ctx.strokeRect(this.boundary.x - this.boundary.w, this.boundary.y - this.boundary.h, this.boundary.w * 2, this.boundary.h * 2);

    ctx.fillStyle = 'white';
    ctx.font = '10px monospace';

    ctx.fillText(this.depth, this.boundary.x, this.boundary.y);

    // ctx.fillText(`${this.depth}`, this.boundary.x + 2, this.boundary.y + 2);

    if (this.divided) {
      this.northeast.show(ctx);
      this.northwest.show(ctx);
      this.southeast.show(ctx);
      this.southwest.show(ctx);
    }
  }
}
export { Point, Rectangle, Circle, QuadTree };