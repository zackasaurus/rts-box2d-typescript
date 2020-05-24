import Game from './Game';
import * as PIXI from 'pixi.js';
import Vector2D from '../utils/Vector2D';

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
  max: {
    angular: { force: number; speed: number };
    force: number;
    speed: number;
  };
  sprite: PIXI.Sprite;
  constructor(game: Game) {
    this.game = game;
    this.physics = this.game.physics;
    this.Box2D = this.game.physics.Box2D;
    this.rand = Math.random() * 1000;
    this.dimensions = {
      x: 50,
      y: 50,
      w: 25,
      h: 100,
    };
    this.max = {
      angular: {
        force: 500,
        speed: 5,
      },
      force: 100,
      speed: 15,
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
    // this.graphics = new PIXI.Graphics();
    // this.graphics.beginFill(0xff33ff);

    // this.graphics.drawRect(0, 0, this.dimensions.w, this.dimensions.h);

    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.tint = 0xff33ff;
    this.sprite.anchor.set(0.5);
    this.sprite.width = this.dimensions.w;
    this.sprite.height = this.dimensions.h;
    this.sprite.x = this.dimensions.w;
    this.sprite.y = this.dimensions.h;

    // Stage
    this.game.viewport.addChild(this.sprite);
  }
  seek() {
    // Find desired vector
    const desired = new Vector2D();
    desired.subtract(this.sprite.position);
    desired.add(this.game.target.position);
    desired.normalize(this.max.speed);

    // Steer vector
    const steer = new Vector2D();
    steer.add(desired);
    steer.subtract(this.body.GetLinearVelocity());
    steer.multiply(this.game.physics.scale);

    // Limit force
    if (steer.length() > this.max.force) {
      steer.normalize(this.max.force);
    }
    return steer;
  }
  setTorque(linearForce: Vector2D) {
    const position = new Vector2D();
    position.subtract(this.sprite.position);
    position.add(this.game.target.position);

    // console.log(this.body.GetAngle());
    let desired = Math.PI / 2 - position.angle() - this.body.GetAngle();

    if (Math.abs(desired) > Math.PI) {
      desired = -Math.sign(desired) * (2 * Math.PI - Math.abs(desired));
    }

    desired *= this.max.angular.speed;
    // console.log(desired);
    // console.log(desired);
    let steer = desired - this.body.GetAngularVelocity();
    steer *= this.game.physics.scale;
    // console.log(steer);
    // console.log(steer);

    // console.log(this.body.GetAngularVelocity());
    if (Math.abs(steer) > this.max.angular.force) {
      return Math.sign(steer) * this.max.angular.force;
    }
    // console.log(steer);
    return steer;
    // desired -= this.body.GetAngle();
    // desired += linearForce.angle()
    console.log(linearForce.angle());
  }
  update() {
    // const pos = this.body.GetPosition();
    // const temp = new this.physics.Box2D.b2Vec2();
    // temp.SelfAdd(pos);
    // temp.SelfMul(this.game.scale);
    // temp.SelfSub({ x: -this.dimensions.w / 2, y: 0 });
    // console.log(this.body.)
    // console.log(this.sprite.position);

    // this.sprite.position = this.body
    //   .GetPosition()
    //   .SelfMul(this.game.physics.scale)
    //   .SelfSub({ x: -this.dimensions.w / 2, y: 0 });
    // console.log(this.sprite.position);
    // console.log(this.game.target.position);

    // console.log(curr);
    // this.sprite.position;
    // force, current position

    const force = this.seek();
    this.body.ApplyForce(
      new this.physics.Box2D.b2Vec2(force.x, force.y),
      this.body.GetPosition()
    );

    this.body.ApplyTorque(this.setTorque(force));

    // this.setAngularVelocity();

    //

    const pos = this.body.GetPosition();
    const temp = new this.physics.Box2D.b2Vec2();
    temp.SelfAdd(pos);
    temp.SelfMul(this.game.physics.scale);
    // temp.SelfSub({ x: -this.dimensions.w / 2, y: -this.dimensions.h / 2 });
    this.sprite.position = temp;

    this.sprite.rotation = this.body.GetAngle();
  }
}
export default Trapezoid;
