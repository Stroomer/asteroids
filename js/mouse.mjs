let mouseDown = false;

export function mousemove(event) {
  if (mouseDown) {
    const canvas = event.target;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const x      = Math.floor((event.clientX - rect.left) * scaleX);
    const y      = Math.floor((event.clientY - rect.top)  * scaleY);

    

    console.log(x, y);
  }
}

export function mousedown(event) {
  console.log('mousedown');
  mouseDown = true;
}

export function mouseup(event) {
  console.log('mouseup');
  mouseDown = false;
}


