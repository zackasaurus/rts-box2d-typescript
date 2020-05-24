import Game from '../Game';
import * as PIXI from 'pixi.js';
import { vectorPixelsToWorld } from '../../utils/Box2DHelpers';
import Vector2D from '../../utils/Vector2D';
import Colors from '../../utils/Colors';
import World from '../World';

class Soldier {
  game: Game;
  graphics: PIXI.Graphics;
  position: { x: number; y: number };
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
    linear: { force: number; speed: number };
  };
  sprite: PIXI.Sprite;

  vertices: [number, number][];
  constructor(public world: World) {
    this.game = world.game;
    this.physics = this.game.physics;
    this.Box2D = this.game.physics.Box2D;

    this.position = {
      x: 500,
      y: 500,
    };

    this.max = {
      angular: {
        force: 25,
        speed: 5,
      },
      linear: {
        force: 100,
        speed: 25,
      },
    };

    // Define body
    this.bd = new this.Box2D.b2BodyDef();
    this.bd.type = 2;
    this.bd.position.Set(
      this.position.x / this.physics.scale,
      this.position.y / this.physics.scale
    );

    // Create body
    this.body = this.physics.world.CreateBody(this.bd);
    this.vertices = [];

    // Vertices need to go clockwise
    this.vertices = [
      [-10, -25],
      [10, -25],
      [25, 25],
      [-25, 25],
    ];
    // this.vertices.push(new Vector2D(-10, -25));
    // this.vertices.push(new Vector2D(10, -25));
    // this.vertices.push(new Vector2D(25, 25));
    // this.vertices.push(new Vector2D(-25, 25));

    // Create Shape
    this.shape = new this.Box2D.b2PolygonShape();
    // Set Shape
    this.shape.Set(
      // Convert to world vertices
      this.vertices.map((vertice) => {
        return vectorPixelsToWorld(new Vector2D(vertice[0], vertice[1]));
      }),
      this.vertices.length
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
    this.graphics.x = 400;
    this.graphics.y = 400;
    this.graphics.beginFill(Colors['belize-hole']['shade-4'], 1);

    this.graphics.drawPolygon(
      this.vertices.map((vertice: [number, number]) => {
        return new PIXI.Point(vertice[0], vertice[1]);
      })
    );
    // Stage
    this.game.viewport.addChild(this.graphics);
  }
  seek() {
    // Find desired vector
    const desired = new Vector2D();
    // console.log(desired);
    desired.subtract(this.graphics.position);
    // console.log(desired);
    desired.add(this.game.target.position);
    // console.log(desired);
    desired.normalize(this.max.linear.speed);
    // console.log(desired);

    // console.log(this.graphics.position);

    // Steer vector
    const steer = new Vector2D();
    steer.add(desired);
    steer.subtract(this.body.GetLinearVelocity());
    steer.multiply(this.max.linear.speed);

    // Limit force
    steer.limit(this.max.linear.force);

    // Edge case if position is equal to exactly the same as target
    if (isNaN(steer.x)) {
      steer.x = 0;
    }
    if (isNaN(steer.y)) {
      steer.y = 0;
    }

    return steer;
  }
  setTorque(linearForce: Vector2D) {
    const position = new Vector2D();
    position.subtract(this.graphics.position);
    position.add(this.game.target.position);

    let desired = Math.PI / 2 - position.angle() - this.body.GetAngle();

    if (Math.abs(desired) > Math.PI) {
      desired = -Math.sign(desired) * (2 * Math.PI - Math.abs(desired));
    }

    desired *= this.max.angular.speed;

    let steer = desired - this.body.GetAngularVelocity();
    steer *= this.game.physics.scale;

    if (Math.abs(steer) > this.max.angular.force) {
      return Math.sign(steer) * this.max.angular.force;
    }
    return steer;
  }
  update() {
    const force = this.seek();
    this.body.ApplyForce(
      new this.physics.Box2D.b2Vec2(force.x, force.y),
      this.body.GetPosition()
    );

    this.body.ApplyTorque(this.setTorque(force));

    const pos = this.body.GetPosition();

    const temp = new this.physics.Box2D.b2Vec2();
    temp.SelfAdd(pos);
    temp.SelfMul(this.game.physics.scale);
    this.graphics.position = temp;

    this.graphics.rotation = this.body.GetAngle();
  }
}
export default Soldier;
