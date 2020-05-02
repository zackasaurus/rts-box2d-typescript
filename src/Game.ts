import './style.css';
import * as PIXI from 'pixi.js';
import Box from './Box';
import Ground from './Ground';
import SetIntervalX from './utils/SetIntervalX';

// Look into: importing as all gives ts error TS2322..
// const Box2D = require('box2d.ts');

class Game {
  app: PIXI.Application;
  Box2D: any;
  world: any;
  scale: number;
  gravity: any;
  box: Box;
  ground: Ground;
  boxes: Box[];

  constructor(Box2D) {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      resizeTo: window,
    });

    this.Box2D = Box2D;

    console.log(this.app);
    console.log(this.Box2D);

    // console.log(Box2D());

    // const box2d = new

    // Define scale
    this.scale = 30;
    // Define gravity
    this.gravity = new Box2D.b2Vec2(0, 1);
    // Define world
    this.world = new Box2D.b2World(this.gravity);
    console.log(this.world);

    this.box = new Box(this);
    this.boxes = [];
    SetIntervalX(
      () => {
        this.boxes.push(new Box(this));
      },
      1,
      1000
    );
    // for (let i = 0; i < 10; i++) {
    //   this.boxes.push(new Box(this));
    // }
    this.ground = new Ground(this);
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

      // Update World
      this.world.Step(time / FPS, 2, 2);

      // Update Boxes
      // this.box.update();
      this.boxes.forEach((box) => {
        box.update();
      });

      this.ground.update();
    });

    // this.app.ticker.add((dt) => {

    //   // console.log(this.body.GetPosition());

    //   // console.log('tick');
    //   // console.log(this.bd);
    // });
  }
}

export default Game;
