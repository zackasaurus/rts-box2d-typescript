import './style.css';
import Game from './model/Game';

// const Box2D = require('./box2d/Box2D_v2.3.1_min.js');
// Box2D().then(function (Box2D) {
//   const game = new Game(Box2D);
//   game.start();
// });

const Box2D = require('box2d.ts');
const game = new Game(Box2D);
game.start();
