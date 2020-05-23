import * as PIXI from 'pixi.js';
import Physics from './Physics';
import Target from './Target';
import World from './World';
import Box from './Box';
import Trapezoid from './Trapezoid';
import Ground from './Ground';
import SetIntervalX from '../utils/SetIntervalX';

import Mouse from '../controller/Mouse';

const config = require('../config.json');
// Look into: importing as all gives ts error TS2322..
// const Box2D = require('box2d.ts');

class Game {
  width: number;
  height: number;
  app: PIXI.Application;
  Box2D: any;
  target: Target;
  mouse: Mouse;
  world: any;
  scale: number;
  gravity: any;
  box: Box;
  ground: Ground;
  boxes: Box[];
  physics: Physics;
  config: any;
  trapezoid: Trapezoid;
  elements: any[];

  constructor(Box2D) {
    this.config = config;
    this.width = this.config.canvas.width;
    this.height = this.config.canvas.height;
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      // transparent: true,
      // resizeTo: window,
    });
    // Mouse events
    this.mouse = new Mouse(this);

    // Physics engine
    this.physics = new Physics(Box2D);

    // World map
    this.world = new World(this);

    // Target
    this.target = new Target(this);

    this.box = new Box(this);
    this.boxes = [];

    // Elements
    this.elements = [];

    for (let i = 0; i < 5; i++) {
      this.elements.push(new Trapezoid(this));
    }

    // this.trapezoid = new Trapezoid(this);
    console.log(this.app);
    console.log(this.app.view);
  }
  start() {
    // Add Canvas to DOM
    document.body.appendChild(this.app.view);
    // FPS
    const FPS = 60;
    // Add boxes

    // Ticker
    const ticker = PIXI.Ticker.shared;
    ticker.add((time) => {
      // console.log(time);

      // Update physics world
      this.physics.world.Step(time / FPS, 6, 2);

      // Update target
      this.target.update();

      // Update Trapezoid
      // this.trapezoid.update();

      // Update Boxes
      this.box.update();

      this.elements.forEach((element) => {
        element.update();
      });

      // this.ground.update();
    });
  }
}

export default Game;
