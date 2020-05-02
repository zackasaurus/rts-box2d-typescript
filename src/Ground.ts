import Game from './Game';
import * as PIXI from 'pixi.js';

class Ground {
  game: Game;
  graphics: PIXI.Graphics;
  dimensions: { x: number; y: number; w: number; h: number };
  Box2D: any;
  bd: any;
  body: any;
  shape: any;
  fd: any;
  skeleton: PIXI.Graphics;
  constructor(game: Game) {
    this.game = game;
    this.Box2D = this.game.Box2D;
    this.dimensions = {
      x: 0,
      y: 700,
      w: window.innerWidth,
      h: 200,
    };
    // Define body
    this.bd = new this.Box2D.b2BodyDef();
    this.bd.type = 0;
    this.bd.position.Set(
      (this.dimensions.x + this.dimensions.w / 2) / this.game.scale,
      (this.dimensions.y + this.dimensions.h / 2) / this.game.scale
    );

    // Create body
    this.body = this.game.world.CreateBody(this.bd);

    // Create Shape
    this.shape = new this.Box2D.b2PolygonShape();
    this.shape.SetAsBox(
      this.dimensions.w / 2 / this.game.scale,
      this.dimensions.h / 2 / this.game.scale
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
    this.graphics.beginFill(0xd3d3d3);
    this.graphics.position.x = this.dimensions.x + this.dimensions.w / 2;
    this.graphics.position.y = this.dimensions.y + this.dimensions.h / 2;
    this.graphics.drawRect(
      -this.dimensions.w / 2,
      -this.dimensions.h / 2,
      this.dimensions.w,
      this.dimensions.h
    );

    // this.skeleton = new PIXI.Graphics();
    // this.skeleton.beginFill(0x00339f00);
    // this.skeleton.position.x = this.dimensions.x + this.dimensions.w / 2;
    // this.skeleton.position.y = this.dimensions.y + this.dimensions.h / 2;
    // this.skeleton.drawRect(
    //   -this.dimensions.w / 2,
    //   -this.dimensions.h / 2,
    //   this.dimensions.w,
    //   this.dimensions.h
    // );

    // Stage
    this.game.app.stage.addChild(this.graphics);

    console.log(this.game.app);
    console.log(this.graphics.position);
  }
  update() {
    // console.log(this.body.GetPosition());

    // console.log(this.body.GetPosition());
    // this.graphics.position = this.body.GetPosition();

    // this.graphics.position = this.body.GetPosition();
    // console.log(this.body.GetPosition());
    // console.log(this.body.GetAngle());
    const pos = this.body.GetPosition();
    const temp = new this.game.Box2D.b2Vec2(0, 0);
    temp.SelfAdd(pos);
    temp.SelfMul(this.game.scale);
    temp.SelfSub({ x: 0, y: 0 });
    // console.log(temp);
    this.graphics.position = temp;

    // this.skeleton.rotation += 0.01;

    // this.graphics.position = this.body
    //   .GetPosition()
    //   .SelfMul(this.game.scale)
    //   .SelfSub(this.dimensions);
  }
}
export default Ground;
