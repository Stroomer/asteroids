import { KEY_A, KEY_CTRL_LEFT, KEY_CTRL_RIGHT, KEY_D, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_S, KEY_SPACE, KEY_UP, KEY_W } from "../utils/constants.mjs";

export default class Keyboard {
    constructor() {
        this.keys = new Set();

        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup',   this.keyUp.bind(this));
    }

    keyDown(event) {
        console.log(`keyDown() ${event.code}`);
        
        event.preventDefault();
        switch (event.code) {
            case 'ArrowUp':      this.keys.add(KEY_UP);         break;
            case 'ArrowDown':    this.keys.add(KEY_DOWN);       break;
            case 'ArrowLeft':    this.keys.add(KEY_LEFT);       break;
            case 'ArrowRight':   this.keys.add(KEY_RIGHT);      break;
            case 'ControlRight': this.keys.add(KEY_CTRL_RIGHT); break;
            case 'KeyW':         this.keys.add(KEY_W);          break;
            case 'KeyS':         this.keys.add(KEY_S);          break;
            case 'KeyA':         this.keys.add(KEY_A);          break;
            case 'KeyD':         this.keys.add(KEY_D);          break;
            case 'ControlLeft':  this.keys.add(KEY_CTRL_LEFT);  break;
            case 'Space':        this.keys.add(KEY_SPACE);      break;
            // case 'Space':     this.keys.add(debug.space);    break;
            // case 'Enter':     this.keys.add(debug.enter);    break;
            default:             console.log('unknown key down');  
        }
    }

    keyUp(event) {
        console.log(`keyUp() ${event.code}`);

        event.preventDefault();
        switch (event.code) {
            case 'ArrowUp':      this.keys.delete(KEY_UP);         break;
            case 'ArrowDown':    this.keys.delete(KEY_DOWN);       break;
            case 'ArrowLeft':    this.keys.delete(KEY_LEFT);       break;
            case 'ArrowRight':   this.keys.delete(KEY_RIGHT);      break;
            case 'ControlRight': this.keys.delete(KEY_CTRL_RIGHT); break;
            case 'KeyW':         this.keys.delete(KEY_W);          break;
            case 'KeyS':         this.keys.delete(KEY_S);          break;
            case 'KeyA':         this.keys.delete(KEY_A);          break;
            case 'KeyD':         this.keys.delete(KEY_D);          break;
            case 'ControlLeft':  this.keys.delete(KEY_CTRL_LEFT);  break;
            case 'Space':        this.keys.delete(KEY_SPACE);      break;
            // case 'Space':     this.keys.add(debug.space);    break;
            // case 'Enter':     this.keys.add(debug.enter);    break;
            default:             console.log('unknown key up');  
        }
    }

    isKeyDown(key) {
        return this.keys.has(key); // ? true : false;
    }

    isKeyUp(key) {
        return !this.keys.has(key); // ? false : true;
    }
}






// const keys    = new Set();
// const player1 = KEYBOARD[0];
// const player2 = KEYBOARD[1];

// export function keydown(event) {
//   event.preventDefault();
//   switch (event.code) {
//     case 'ArrowUp':      keys.add(player1.up);    break;
//     case 'ArrowDown':    keys.add(player1.down);  break;
//     case 'ArrowLeft':    keys.add(player1.left);  break;
//     case 'ArrowRight':   keys.add(player1.right); break;
//     case 'ControlRight': keys.add(player1.fire);  break;
//     case 'KeyW':         keys.add(player2.up);    break;
//     case 'KeyS':         keys.add(player2.down);  break;
//     case 'KeyA':         keys.add(player2.left);  break;
//     case 'KeyD':         keys.add(player2.right); break;
//     case 'ControlLeft':  keys.add(player2.fire);  break;
//     case 'Space':        keys.add(player1.fire);  break;
//     // case 'Space':     keys.add(debug.space);   break;
//     // case 'Enter':     keys.add(debug.enter);   break;
//     default:             console.log('unknown key down');  
//   }
// }

// export function keyup(event) {
//   event.preventDefault();
//   switch (event.code) {
//     case 'ArrowUp':      keys.delete(player1.up);    break;
//     case 'ArrowDown':    keys.delete(player1.down);  break;
//     case 'ArrowLeft':    keys.delete(player1.left);  break;
//     case 'ArrowRight':   keys.delete(player1.right); break;
//     case 'ControlRight': keys.delete(player1.fire);  break;
//     case 'KeyW':         keys.delete(player2.up);    break;
//     case 'KeyS':         keys.delete(player2.down);  break;
//     case 'KeyA':         keys.delete(player2.left);  break;
//     case 'KeyD':         keys.delete(player2.right); break;
//     case 'ControlLeft':  keys.delete(player2.fire);  break;
//     case 'Space':        keys.delete(player1.fire);  break;
//     // case 'Space':     keys.delete(debug.space);   break;
//     // case 'Enter':     keys.delete(debug.enter);   break;
//     default:             console.log('unknown key up');  
//   }
// }

// export function isKeyDown(key) {
//   return keys.has(key) ? true : false;
// }

// export function isKeyUp(key) {
//   return keys.has(key) ? false : true;
// }