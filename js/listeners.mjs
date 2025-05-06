import { resize, keydown, keyup } from './utils.mjs';
import { init } from './main.mjs';

window.addEventListener('load',    init);
window.addEventListener('keydown', keydown);
window.addEventListener('keyup',   keyup);
window.addEventListener('resize',  resize);
