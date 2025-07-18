export const MPLAYER_MODE     = false;

export const MAX_FPS          = 60;
export const FRAME_INTERVAL   = 1 / MAX_FPS;
export const PI               = Math.PI;

// Forces & limits
export const FRICTION         = 0.99;
export const PLAYER_MAXSPEED  = 80.0;
export const PLAYER_ROT_SPD   = 5.0;
export const BULLET_MAXSPEED  = 120.0;

// Ids
export const PLAYER           = 1;
export const ASTEROID         = 2;
export const BULLET           = 3;

// Colors
export const BACKGROUND_COLOR = 'black';
export const PLAYER_COLOR     = 'cyan';
export const ASTEROID_COLOR   = 'white';
export const BULLET_COLOR     = 'red';

// Screen
export const SCREEN_WIDTH     = 320;
export const SCREEN_HEIGHT    = 200;
export const SCREEN_MARGIN    = 20;

const CURSOR_UP    = 38;
const CURSOR_DOWN  = 40;
const CURSOR_LEFT  = 37;
const CURSOR_RIGHT = 39;
const CTRL_RIGHT   = 17;

const KEY_W        = 6;
const KEY_S        = 7;
const KEY_A        = 8;
const KEY_D        = 9;
const CTRL_LEFT    = -17;

const SPACE        = 32;
const ENTER        = 13;

export const KEYBOARD = [ { up: CURSOR_UP, down: CURSOR_DOWN, left: CURSOR_LEFT, right: CURSOR_RIGHT, fire: SPACE     },
                          { up: KEY_W,     down: KEY_S,       left: KEY_A,       right: KEY_D,        fire: CTRL_LEFT } ];
                                  
// export const DEBUG     = { space: SPACE, enter: ENTER };