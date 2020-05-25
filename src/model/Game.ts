import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Stats from '../lib/stats';
import Physics from './Physics';
import Target from './Target';
import World from './World';
import Rectangle from './Rectangle';
import Ground from './Ground';
import Controls from '../controller';
import Mouse from '../controller/Mouse';
import Keys from '../controller/Keys';
import Panel from './panel';

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
  ground: Ground;
  physics: Physics;
  config: any;
  rectangle: Rectangle;
  elements: any[];
  viewport: Viewport;
  sprite: PIXI.Sprite;
  background: PIXI.Graphics;
  graphics: PIXI.Graphics;
  border: number;
  keys: any;
  radar: PIXI.Container;
  units: PIXI.Container;
  panel: Panel;
  controls: Controls;

  constructor(Box2D) {
    this.config = config;
    this.width = this.config.canvas.width;
    this.height = this.config.canvas.height;

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      resizeTo: window,
    });

    // Adding PIXI application to DOM and setting id to game
    document.body.appendChild(this.app.view).setAttribute('id', 'game');

    // Base background
    this.background = new PIXI.Graphics();
    this.background.beginFill(0x566573);
    this.background.drawRect(0, 0, window.innerWidth, window.innerHeight);
    this.app.stage.addChild(this.background);

    // Viewport
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: this.width,
      worldHeight: this.height,

      interaction: this.app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    // add the viewport to the stage
    this.app.stage.addChild(this.viewport);

    this.border = 500;

    // activate plugins
    this.viewport
      // index.d.ts file has not yet been updated with keyToPress
      // @ts-ignore
      // { keyToPress: ['ShiftLeft'] }
      .drag()
      .pinch()
      .wheel()
      .decelerate()
      .clamp({
        left: -this.border,
        right: this.viewport.worldWidth + this.border,
        top: -this.border,
        bottom: this.viewport.worldHeight + this.border,
        underflow: 'center',
      })
      .clampZoom({
        minWidth: 500,
        minHeight: 500,
        maxWidth: 4000,
        maxHeight: 4000,
      });

    this.controls = new Controls(this);

    this.physics = new Physics(Box2D);

    this.world = new World(this);

    this.panel = new Panel(this);
  }
  start() {
    // FPS
    const FPS = 60;
    // Add boxes

    // Target
    this.target = new Target(this);

    // Stats
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    // Ticker
    const ticker = PIXI.Ticker.shared;
    ticker.add((time) => {
      // Begin Stats
      stats.begin();

      this.controls.update();
      // Update physics world
      // 6 velocity iterations, 2 position iterations is the recommended settings
      // https://box2d.org/documentation/md__d_1__git_hub_box2d_docs_hello.html
      this.physics.world.Step(time / FPS, 6, 2);

      // Update target
      this.target.update();

      // Update graphics world
      this.world.update();

      // Elements
      // this.elements.forEach((element) => {
      //   element.update();
      // });

      // End Stats
      stats.end();
    });
  }
}

export default Game;
