import { SCREEN_MARGIN } from './constants.mjs';
import { P1_UP, P1_DOWN, P1_LEFT, P1_RIGHT, P1_FIRE, P2_UP, P2_DOWN, P2_LEFT, P2_RIGHT, P2_FIRE, } from './constants.mjs'; 

const keys = new Set();

export function resize(event) {
  const canvas = document.getElementById('screen');
  const size   = Math.min(window.innerWidth, window.innerHeight) - SCREEN_MARGIN;

  canvas.style.width = canvas.style.height = `${size}px`;
}

export function keydown(event) {
  event.preventDefault();
  switch (event.code) {
    case 'ArrowUp':      keys.add(P1_UP);    break;
    case 'ArrowDown':    keys.add(P1_DOWN);  break;
    case 'ArrowLeft':    keys.add(P1_LEFT);  break;
    case 'ArrowRight':   keys.add(P1_RIGHT); break;
    case 'ControlRight': keys.add(P1_FIRE);  break;
    case 'KeyW':         keys.add(P2_UP);    break;
    case 'KeyS':         keys.add(P2_DOWN);  break;
    case 'KeyA':         keys.add(P2_LEFT);  break;
    case 'KeyD':         keys.add(P2_RIGHT); break;
    case 'ControlLeft':  keys.add(P2_FIRE);  break;
    default:             console.log('unknown key down');  
  }
}

export function keyup(event) {
  event.preventDefault();
  switch (event.code) {
    case 'ArrowUp':      keys.delete(P1_UP);    break;
    case 'ArrowDown':    keys.delete(P1_DOWN);  break;
    case 'ArrowLeft':    keys.delete(P1_LEFT);  break;
    case 'ArrowRight':   keys.delete(P1_RIGHT); break;
    case 'ControlRight': keys.delete(P1_FIRE);  break;
    case 'KeyW':         keys.delete(P2_UP);    break;
    case 'KeyS':         keys.delete(P2_DOWN);  break;
    case 'KeyA':         keys.delete(P2_LEFT);  break;
    case 'KeyD':         keys.delete(P2_RIGHT); break;
    case 'ControlLeft':  keys.delete(P2_FIRE);  break;
    default:           console.log('unknown key up');  
  }
}

export function isDown(key) {
  return keys.has(key) ? true : false;
}

export function isUp(key) {
  return keys.has(key) ? false : true;
}