import Game from './Game';
import * as PIXI from 'pixi.js';

class Trapezoid {
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
      x: 10,
      y: 10,
      w: 50,
      h: 50,
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
      this.dimensions.h / this.physics.scale
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
    this.game.app.stage.addChild(this.graphics);
  }
  update() {
    // const pos = this.body.GetPosition();
    // const temp = new this.physics.Box2D.b2Vec2();
    // temp.SelfAdd(pos);
    // temp.SelfMul(this.game.scale);
    // temp.SelfSub({ x: -this.dimensions.w / 2, y: 0 });
    // console.log(this.body.)
    // console.log(this.graphics.position);

    // this.graphics.position = this.body
    //   .GetPosition()
    //   .SelfMul(this.game.physics.scale)
    //   .SelfSub({ x: -this.dimensions.w / 2, y: 0 });
    // console.log(this.graphics.position);
    // console.log(this.game.target.position);
    const desired = new this.physics.Box2D.b2Vec2();
    desired.SelfSub(this.graphics.position);
    desired.SelfAdd(this.game.target.position);
    desired.SelfNormalize();
    desired.SelfMul(10);

    // console.log(this.body.GetLinearVelocity());
    this.body.SetAngularVelocity(0);
    //
    const steer = new this.physics.Box2D.b2Vec2();
    steer.SelfAdd(desired);
    steer.SelfSub(this.body.GetLinearVelocity());
    steer.SelfMul(this.game.physics.scale);

    // console.log(curr);
    // this.graphics.position;
    // force, current position
    this.body.ApplyForce(
      new this.physics.Box2D.b2Vec2(steer.x, steer.y),
      this.body.GetPosition()
    );

    const pos = this.body.GetPosition();
    const temp = new this.physics.Box2D.b2Vec2();
    temp.SelfAdd(pos);
    temp.SelfMul(this.game.physics.scale);
    temp.SelfSub({ x: -this.dimensions.w / 2, y: -this.dimensions.h / 2 });
    this.graphics.position = temp;

    this.graphics.rotation = this.body.GetAngle();
  }
}
export default Trapezoid;
