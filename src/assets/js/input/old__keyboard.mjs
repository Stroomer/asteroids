import { KEYBOARD } from '../utils/constants.mjs';

const keys    = new Set();
const player1 = KEYBOARD[0];
const player2 = KEYBOARD[1];

export function keydown(event) {
  event.preventDefault();
  switch (event.code) {
    case 'ArrowUp':      keys.add(player1.up);    break;
    case 'ArrowDown':    keys.add(player1.down);  break;
    case 'ArrowLeft':    keys.add(player1.left);  break;
    case 'ArrowRight':   keys.add(player1.right); break;
    case 'ControlRight': keys.add(player1.fire);  break;
    case 'KeyW':         keys.add(player2.up);    break;
    case 'KeyS':         keys.add(player2.down);  break;
    case 'KeyA':         keys.add(player2.left);  break;
    case 'KeyD':         keys.add(player2.right); break;
    case 'ControlLeft':  keys.add(player2.fire);  break;
    case 'Space':        keys.add(player1.fire);  break;
    // case 'Space':     keys.add(debug.space);   break;
    // case 'Enter':     keys.add(debug.enter);   break;
    default:             console.log('unknown key down');  
  }
}

export function keyup(event) {
  event.preventDefault();
  switch (event.code) {
    case 'ArrowUp':      keys.delete(player1.up);    break;
    case 'ArrowDown':    keys.delete(player1.down);  break;
    case 'ArrowLeft':    keys.delete(player1.left);  break;
    case 'ArrowRight':   keys.delete(player1.right); break;
    case 'ControlRight': keys.delete(player1.fire);  break;
    case 'KeyW':         keys.delete(player2.up);    break;
    case 'KeyS':         keys.delete(player2.down);  break;
    case 'KeyA':         keys.delete(player2.left);  break;
    case 'KeyD':         keys.delete(player2.right); break;
    case 'ControlLeft':  keys.delete(player2.fire);  break;
    case 'Space':        keys.delete(player1.fire);  break;
    // case 'Space':     keys.delete(debug.space);   break;
    // case 'Enter':     keys.delete(debug.enter);   break;
    default:             console.log('unknown key up');  
  }
}

export function isKeyDown(key) {
  return keys.has(key) ? true : false;
}

export function isKeyUp(key) {
  return keys.has(key) ? false : true;
}