import { mouseDown, mouseX, mouseY } from "../mouse.mjs";

export class QuadTree {
  
  static MAX_DEPTH = 4;
  static DEFAULT_CAPACITY = 1;

  constructor(boundary, capacity=QuadTree.DEFAULT_CAPACITY, depth=QuadTree.MAX_DEPTH) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.depth    = depth;
    this.points   = []; 
    this.divided  = false;
    
    console.log(`capacity:${capacity}  depth: ${depth}`);
    
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      console.log('insert: false');
      return false;
    }

    if (!this.divided) {



      if (this.points.length < this.capacity || this.depth === QuadTree.MAX_DEPTH) {
        console.log('push points');
        this.points.push(point);
        return true;
      }

      console.log('subdivide');
      
      this.subdivide();
    }

    if (this.northeast.insert(point)) {
      return true;
    } else if (this.northwest.insert(point)) {
      return true;
    } else if (this.southeast.insert(point)) {
      return true;
    } else if (this.southwest.insert(point)) {
      return true;
    }
  }

  subdivide() {
    const { x, y, w, h } = this.boundary;

    const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

    this.northeast = new QuadTree(ne, this.capacity, this.depth + 1);
    this.northwest = new QuadTree(nw, this.capacity, this.depth + 1);
    this.southeast = new QuadTree(se, this.capacity, this.depth + 1);
    this.southwest = new QuadTree(sw, this.capacity, this.depth + 1);

    this.divided = true;
  }

  query(range, found) {
    if (this.boundary.intersects(range)) {
      return found;
    } else {
      for (const p of this.points) {
        if (range.contains(p)) { 
          found.push(p);       
        }
      } 

      if (this.divided) {
        this.northwest.query(range, found);  
        this.northeast.query(range, found);  
        this.southwest.query(range, found);  
        this.southwest.query(range, found);  
      }

      return found;
    }
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

    ctx.fillStyle = 'yellow';
    for (let p of this.points) {
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

  intersects(range) {
    return !(range.x - range.w > this.x + this.w
          || range.x + range.w < this.x - this.w
          || range.y - range.h > this.y + this.h
          || range.y + range.h < this.y - this.h);
  }

  contains(point) {
    return point.x >= this.x - this.w && point.x <= this.x + this.w && point.y >= this.y - this.h && point.y <= this.y + this.h;
  }
}
