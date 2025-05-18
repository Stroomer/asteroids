import { resize } from './window.mjs';
import { keydown, keyup } from './keyboard.mjs';
import { init } from './main.mjs';

window.addEventListener('load',    init);
window.addEventListener('keydown', keydown);
window.addEventListener('keyup',   keyup);
window.addEventListener('resize',  resize);
