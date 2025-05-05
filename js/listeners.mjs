import { resize } from './utils.mjs';
import { init } from './main.mjs';

window.addEventListener('load',    init);
window.addEventListener('keydown', resize);
window.addEventListener('resize',  resize);
