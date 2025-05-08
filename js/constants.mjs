export const MAX_FPS = 60;
export const FIXED_STEP_FPS = 0.015;

//console.log(1000 / 0.015);


// console.log(1000 / 60);
// console.log(1000 / 62);

export const BACKGROUND_COLOR = 'black';
export const P1_COLOR         = 'cyan';
export const P2_COLOR         = 'blue';
export const ASTEROID_COLOR   = 'lightgrey';

export const SCREEN_WIDTH     = 320;
export const SCREEN_HEIGHT    = 320;
export const SCREEN_MARGIN    = 20;

const CURSOR_UP        = 38;
const CURSOR_DOWN      = 40;
const CURSOR_LEFT      = 37;
const CURSOR_RIGHT     = 39;
const CTRL_RIGHT       = 17;

const KEY_W            = 6;
const KEY_S            = 7;
const KEY_A            = 8;
const KEY_D            = 9;
const CTRL_LEFT        = -17;

export const KEYBOARD         = [ { up: CURSOR_UP, down: CURSOR_DOWN, left: CURSOR_LEFT, right: CURSOR_RIGHT, fire: CTRL_RIGHT },
                                  { up: KEY_W,     down: KEY_S,       left: KEY_A,       right: KEY_D,        fire: CTRL_LEFT  } ];