import Game from './core/Game.mjs';
import { getScreen } from './screen/screen.mjs';

const screen = getScreen();
const game = new Game(screen);
