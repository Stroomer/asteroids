import { KEY_A, KEY_CTRL_LEFT, KEY_CTRL_RIGHT, KEY_D, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_S, KEY_SPACE, KEY_UP, KEY_W } from "../utils/constants.mjs";

export default class Keyboard {
    constructor() {
        this.keys = new Set();

        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup',   this.keyUp.bind(this));
    }

    keyDown(event) {
        //console.log(`keyDown() ${event.code}`);
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
            default:             console.log('unknown key down');  
        }
    }

    keyUp(event) {
        //console.log(`keyUp() ${event.code}`);
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
            default:             console.log('unknown key up');  
        }
    }

    isKeyDown(key) {
        return this.keys.has(key);
    }

    isKeyUp(key) {
        return !this.keys.has(key);
    }
}