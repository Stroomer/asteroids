import { resize } from '../window.mjs';
import { keydown, keyup } from './keyboard.mjs';
import { mousemove, mousedown, mouseup, mouseleave } from './mouse.mjs';
import { init } from '../main.mjs';

window.addEventListener('load', init);
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
window.addEventListener('resize', resize);

document.getElementById('screen').addEventListener('mousemove', mousemove);
document.getElementById('screen').addEventListener('mousedown', mousedown);
document.getElementById('screen').addEventListener('mouseup', mouseup);
document.getElementById('screen').addEventListener('mouseleave', mouseleave);
