import { resize } from '../js/window.mjs';
import { keydown, keyup } from '../js/input/keyboard.mjs';
import { mousemove, mousedown, mouseup, mouseleave } from '../js/input/mouse.mjs'; 
import { init } from '../js/main.mjs';

window.addEventListener('load',    init);
window.addEventListener('keydown', keydown);
window.addEventListener('keyup',   keyup);
window.addEventListener('resize',  resize);

document.getElementById('screen').addEventListener('mousemove',  mousemove);
document.getElementById('screen').addEventListener('mousedown',  mousedown);
document.getElementById('screen').addEventListener('mouseup',    mouseup);
document.getElementById('screen').addEventListener('mouseleave', mouseleave);
