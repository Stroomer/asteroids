export const BACKGROUND_COLOR = 'black';
export const P1_COLOR         = 'cyan';
export const P2_COLOR         = 'blue';
export const ASTEROID_COLOR   = 'lightgrey';

export const SCREEN_WIDTH     = 320;
export const SCREEN_HEIGHT    = 320;
export const SCREEN_MARGIN    = 20;

// export const P1_UP            = 1;
// export const P1_DOWN          = 2;
// export const P1_LEFT          = 3;
// export const P1_RIGHT         = 4;
// export const P1_FIRE          = 5;

// export const P2_UP            = 6;
// export const P2_DOWN          = 7;
// export const P2_LEFT          = 8;
// export const P2_RIGHT         = 9;
// export const P2_FIRE          = 10;

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