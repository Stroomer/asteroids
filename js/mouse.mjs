import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./constants.mjs";

export let mouseDown = false;
export let mouseX    = null;
export let mouseY    = null;

export function mousemove(event) {
  setMousePosition(event);
  
  if (mouseDown) {
    
  }
}

export function mousedown(event) {
  setMousePosition(event)
  mouseDown = true;
  //console.log('mousedown');
}

export function mouseup(event) {
  setMousePosition(event);
  mouseDown = false;
  mouseX    = null;
  mouseY    = null;
  //console.log('mouseup');
}

export function mouseleave() {
  mouseDown = false;
  mouseX    = null;
  mouseY    = null;
}

function setMousePosition(event) {
  const canvas = event.target;
  const rect   = canvas.getBoundingClientRect();
  const scaleX = canvas.width  / rect.width;
  const scaleY = canvas.height / rect.height;
  const x      = Math.floor((event.clientX - rect.left) * scaleX);
  const y      = Math.floor((event.clientY - rect.top)  * scaleY);
  
  mouseX = x < 0 || x > SCREEN_WIDTH  ? null : x;
  mouseY = y < 0 || y > SCREEN_HEIGHT ? null : y;
}
