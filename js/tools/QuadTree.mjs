export class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      this.northeast.insert(point);
      this.northwest.insert(point);
      this.southeast.insert(point);
      this.southwest.insert(point);
    }
  }

  subdivide() {
    const { x, y, w, h } = this.boundary;

    const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

    this.northeast = new QuadTree(ne, this.capacity);
    this.northwest = new QuadTree(nw, this.capacity);
    this.southeast = new QuadTree(se, this.capacity);
    this.southwest = new QuadTree(sw, this.capacity);

    this.divided = true;
  }

  show(ctx) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;

    ctx.strokeRect(this.boundary.x - this.boundary.w, this.boundary.y - this.boundary.h, this.boundary.w * 2, this.boundary.h * 2);
    if (this.divided) {
      this.northeast.show(ctx);
      this.northwest.show(ctx);
      this.southeast.show(ctx);
      this.southwest.show(ctx);
    }

    for (let p of this.points) {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
    }
  }
}

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return point.x >= this.x - this.w && point.x <= this.x + this.w && point.y >= this.y - this.h && point.y <= this.y + this.h;
  }
}
