import World from './World';
import * as PIXI from 'pixi.js';
import Vector2d from '../utils/Vector2D';
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
  sprite: PIXI.Sprite;
  chainShape: any;
  vertices: Vector2d[];
  constructor(public world: World) {
    this.physics = this.world.game.physics;
    this.Box2D = this.world.game.physics.Box2D;
    this.rand = Math.random() * 1000;

    // Pixel World Units
    this.dimensions = {
      x: 100,
      y: 200,
      w: 50,
      h: 500,
    };
    this.max = {
      force: 100,
      speed: 15,
    };

    const {
      canvas: { width, height },
      scale,
    } = this.world.game.config;

    this.vertices = [];
    this.vertices.push(new Vector2d(0, 0));
    this.vertices.push(new Vector2d(width / scale, 0));
    this.vertices.push(new Vector2d(width / scale, height / scale));
    this.vertices.push(new Vector2d(0, height / scale));
    this.vertices.push(new Vector2d(0, 0));

    this.chainShape = new this.Box2D.b2ChainShape();

    this.chainShape.CreateChain(this.vertices);

    // Define body
    this.bd = new this.Box2D.b2BodyDef();
    this.bd.type = 0;
    this.bd.position.Set(0, 0);

    // Create body
    this.body = this.physics.world.CreateBody(this.bd);

    // Create Shape
    // this.shape = new this.Box2D.b2PolygonShape();
    // this.shape.SetAsBox(
    //   this.dimensions.w / 2 / this.physics.scale,
    //   this.dimensions.h / 2 / this.physics.scale
    // );

    // Create Fixture
    this.fd = new this.Box2D.b2FixtureDef();
    this.fd.shape = this.chainShape;
    this.fd.density = 1;
    this.fd.friction = 1;
    this.fd.restitution = 0;

    // Attach
    this.body.CreateFixture(this.fd);

    // Graphics
    // this.graphics = new PIXI.Graphics();
    // this.graphics.beginFill(0x8833ff);
    // // this.graphics.position.x = this.dimensions.x + this.dimensions.w / 2;
    // // this.graphics.position.y = this.dimensions.y + this.dimensions.h / 2;
    // this.graphics.drawRect(0, 0, this.dimensions.w, this.dimensions.h);
    // this.graphics.anchor.set(0.5);

    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.tint = 0x8833ff;
    this.sprite.anchor.set(0.5);
    this.sprite.width = this.dimensions.w;
    this.sprite.height = this.dimensions.h;
    this.sprite.x = this.dimensions.w;
    this.sprite.y = this.dimensions.h;
    // this.sprite.rotation = 0.1;

    // Stage
    // this.world.game.viewport.addChild(this.chainShape);
  }

  update() {
    const pos = this.body.GetPosition();
    // console.log(pos);
    const temp = new this.physics.Box2D.b2Vec2();
    temp.SelfAdd(pos);
    temp.SelfMul(this.world.game.physics.scale);
    // temp.SelfSub({ x: -this.dimensions.w / 2, y: -this.dimensions.h / 2 });
    this.sprite.position = temp;

    this.sprite.rotation = this.body.GetAngle();
  }
}

export default Boundary;
