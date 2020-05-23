import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
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
  viewport: Viewport;
  sprite: PIXI.Sprite;

  constructor(Box2D) {
    this.config = config;
    this.width = this.config.canvas.width;
    this.height = this.config.canvas.height;
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      // transparent: true,
      // resizeTo: window,
    });
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,

      interaction: this.app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
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

    for (let i = 0; i < this.config.elements.total; i++) {
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

    // add the viewport to the stage
    this.app.stage.addChild(this.viewport);

    // activate plugins
    this.viewport.drag().pinch().wheel().decelerate();

    // add a red box
    this.sprite = this.viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
    this.sprite.tint = 0xff0000;
    this.sprite.width = this.sprite.height = 100;
    this.sprite.position.set(100, 100);

    // Ticker
    const ticker = PIXI.Ticker.shared;
    ticker.add((time) => {
      // console.log(time);

      // Update physics world
      // 6 velocity iterations, 2 position iterations is the recommended settings
      // https://box2d.org/documentation/md__d_1__git_hub_box2d_docs_hello.html
      this.physics.world.Step(time / FPS, 6, 2);

      // Update graphics world
      this.world.update();

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
