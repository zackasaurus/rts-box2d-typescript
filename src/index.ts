import './style.css';
import './Game';
import Game from './Game';

// const Box2D = require('./box2d/Box2D_v2.3.1_min.js');
// Box2D().then(function (Box2D) {
//   const game = new Game(Box2D);
//   game.start();
// });

const Box2D = require('box2d.ts');
const game = new Game(Box2D);
game.start();

// import * as PIXI from 'pixi.js';
// import Matter from 'matter-js';
// import * as box2d from 'box2d.ts';

// console.log(box2d);

// const app = new PIXI.Application({
//   width: window.innerWidth,
//   height: window.innerHeight,
//   antialias: true,
//   resizeTo: window,
// });
// // module aliases
// var Engine = Matter.Engine,
//   Render = Matter.Render,
//   World = Matter.World,
//   Bodies = Matter.Bodies;

// // create an engine
// var engine = Engine.create();

// // create a renderer
// // var render = Render.create({
// //   element: document.body,
// //   engine: engine,
// // });

// // create two boxes and a ground
// // var boxA = Bodies.rectangle(500, 0, 10, 10);
// // var boxB = Bodies.rectangle(450, 50, 80, 80);
// // const boxes: Matter.Body[] = [];
// const shapes: PIXI.Graphics[] = [];

// const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
// // ground.translate()
// // ground.position.x += 801 / 2;
// // ground.position.y += 60 / 2;
// const gg = new PIXI.Graphics();
// gg.beginFill(0xffffff);
// gg.drawRect(400, 610, 810, 60);
// app.stage.addChild(gg);
// // shapes.push(gg);
// console.log('gg');

// // add all of the bodies to the world
// World.add(engine.world, ground);

// let x = 0;
// const intervalID = setInterval(function () {
//   console.log('aa');
//   // Your logic here
//   const rand = Math.random() * 200;
//   const box = Bodies.rectangle(200 + rand, 0, 10, 10);
//   World.add(engine.world, box);

//   const graphic = new PIXI.Graphics();
//   graphic.beginFill(0x3389ff);
//   graphic.drawRect(200 + rand, 0, 10, 10);
//   app.stage.addChild(graphic);
//   shapes.push(graphic);

//   if (++x === 100) {
//     window.clearInterval(intervalID);
//   }
// }, 30);
// // World.add(engine.world, boxes);

// // run the engine
// Engine.run(engine);

// // console.log(engine);

// // PIXI
// document.body.appendChild(app.view);

// app.ticker.add(() => {
//   // console.log(shapes);
//   shapes.forEach((item, index) => {
//     item.position.x = engine.world.bodies[index].position.x;
//     item.position.y = engine.world.bodies[index].position.y;
//   });
// });
