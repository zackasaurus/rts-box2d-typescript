import Game from './Game';
import * as PIXI from 'pixi.js';

class Box {
  game: Game;
  graphics: PIXI.Graphics;
  dimensions: { x: number; y: number; w: number; h: number };
  Box2D: any;
  bd: any;
  body: any;
  shape: any;
  fd: any;
  skeleton: PIXI.Graphics;
  rand: number;
  physics: any;
  constructor(game: Game) {
    this.game = game;
    this.physics = this.game.physics;
    this.Box2D = this.game.physics.Box2D;
    this.rand = Math.random() * 1000;
    this.dimensions = {
      x: 100,
      y: 0,
      w: 5 + Math.random() * 10,
      h: 70 + Math.random() * 10,
    };
    // Define body
    this.bd = new this.Box2D.b2BodyDef();
    this.bd.type = 2;
    this.bd.position.Set(
      this.dimensions.x / this.physics.scale,
      this.dimensions.y / this.physics.scale
    );

    // Create body
    this.body = this.physics.world.CreateBody(this.bd);

    // Create Shape
    this.shape = new this.Box2D.b2PolygonShape();
    this.shape.SetAsBox(
      this.dimensions.w / this.physics.scale,
      this.dimensions.h / 2 / this.physics.scale
    );

    // Create Fixture
    this.fd = new this.Box2D.b2FixtureDef();
    this.fd.shape = this.shape;
    this.fd.density = 1;
    this.fd.friction = 1;
    this.fd.restitution = 0;

    // Attach
    this.body.CreateFixture(this.fd);

    // Graphics
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0xff33ff);
    this.graphics.position.x = this.dimensions.x + this.dimensions.w / 2;
    this.graphics.position.y = this.dimensions.y + this.dimensions.h / 2;
    this.graphics.drawRect(
      -this.dimensions.w / 2,
      -this.dimensions.h / 2,
      this.dimensions.w,
      this.dimensions.h
    );

    // Stage
    this.game.viewport.addChild(this.graphics);
  }
  update() {
    // this.graphics.position = this.body.GetPosition();
    // console.log(this.body.GetPosition());
    // console.log(this.body.GetAngle());
    const pos = this.body.GetPosition();
    const temp = new this.physics.Box2D.b2Vec2();
    temp.SelfAdd(pos);
    temp.SelfMul(this.physics.scale);
    temp.SelfSub({ x: this.dimensions.w / 2, y: -this.dimensions.h / 2 });
    this.graphics.position = temp;
    // console.log(this.graphics.position);
    this.graphics.rotation = this.body.GetAngle();
    // this.skeleton.rotation += 0.01;
  }
}
export default Box;
