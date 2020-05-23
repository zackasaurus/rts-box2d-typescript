import World from './World';
import * as PIXI from 'pixi.js';
class Boundary {
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
  max: { force: number; speed: number };
  constructor(public world: World) {
    this.physics = this.world.game.physics;
    this.Box2D = this.world.game.physics.Box2D;
    this.rand = Math.random() * 1000;

    // World units
    this.dimensions = {
      x: 1,
      y: 4,
      w: 5,
      h: 50,
    };
    this.max = {
      force: 100,
      speed: 15,
    };
    // Define body
    this.bd = new this.Box2D.b2BodyDef();
    this.bd.type = 0;
    this.bd.position.Set(
      this.dimensions.x - this.dimensions.w / 2,
      this.dimensions.y - this.dimensions.h / 2
    );

    // Create body
    this.body = this.physics.world.CreateBody(this.bd);

    // Create Shape
    this.shape = new this.Box2D.b2PolygonShape();
    this.shape.SetAsBox(
      this.dimensions.w / 2 / this.physics.scale,
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
    this.graphics.beginFill(0x8833ff);
    // this.graphics.position.x = this.dimensions.x + this.dimensions.w / 2;
    // this.graphics.position.y = this.dimensions.y + this.dimensions.h / 2;
    this.graphics.drawRect(0, 0, this.dimensions.w, this.dimensions.h);

    // Stage
    this.world.game.viewport.addChild(this.graphics);
  }

  update() {
    const pos = this.body.GetPosition();
    // console.log(pos);
    const temp = new this.physics.Box2D.b2Vec2();
    temp.SelfAdd(pos);
    temp.SelfMul(this.world.game.physics.scale);
    // temp.SelfSub({ x: -this.dimensions.w / 2, y: -this.dimensions.h / 2 });
    this.graphics.position = temp;

    this.graphics.rotation = this.body.GetAngle();
  }
}

export default Boundary;
