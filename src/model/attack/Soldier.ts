import Game from '../Game';
import * as PIXI from 'pixi.js';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
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
    separate: { radius: number };
    alignment: { radius: number };
    approach: { radius: number };
  };
  sprite: PIXI.Sprite;

  vertices: [number, number][];
  scale: any;
  constructor(public world: World, public id: number) {
    this.game = world.game;
    this.physics = this.game.physics;
    this.scale = this.game.config.scale;
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
        force: 75,
        speed: 20,
      },
      separate: {
        radius: 2,
      },
      alignment: {
        radius: 10,
      },
      approach: {
        radius: 20,
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
      [-5, -25],
      [5, -25],
      [15, 25],
      [-15, 25],
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
    this.graphics.beginFill(0xffffff, 1);
    this.graphics.lineStyle(3, Colors['belize-hole']['shade-4']);

    this.graphics.drawPolygon(
      this.vertices.map((vertice: [number, number]) => {
        return new PIXI.Point(vertice[0], vertice[1]);
      })
    );
    // this.graphics.filters = [new MotionBlurFilter([1, 2], 30)];
    // Stage
    this.game.viewport.addChild(this.graphics);
  }
  combine(forces: Vector2D[], reducer: number = 1) {
    const combinedForce = new Vector2D();
    forces.forEach((force) => {
      combinedForce.add(force);
    });
    // console.log(reducer);
    combinedForce.multiply(reducer);
    return combinedForce;
  }
  approach() {
    const distance = Vector2D.distance(
      this.body.GetPosition(),
      vectorPixelsToWorld(this.game.target.position)
    );
    if (distance < this.max.approach.radius) {
      return (distance / this.max.approach.radius) * this.max.linear.speed;
    }
    return this.max.linear.speed;
  }
  separate(weight: number = 1) {
    const sum = new Vector2D();
    let count = 0;

    this.world.soldiers.forEach((soldier) => {
      const { id } = soldier;

      const distance = Vector2D.distance(
        this.body.GetPosition(),
        soldier.body.GetPosition()
      );
      // console.log(distance);
      if (this.id !== id && distance < this.max.separate.radius) {
        const difference = new Vector2D();
        difference.add(this.body.GetPosition());
        difference.subtract(soldier.body.GetPosition());
        difference.divide(distance);
        // console.log(difference);
        sum.add(difference);
        count++;
      }
    });
    if (count > 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.approach());

      sum.subtract(this.body.GetLinearVelocity());
      sum.limit(this.max.linear.force);
    }
    sum.multiply(weight);
    // console.log(sum);

    // if (isNaN(sum.x)) {
    //   sum.x = 0;
    // }
    // if (isNaN(sum.y)) {
    //   sum.y = 0;
    // }
    return sum;
  }

  alignment(weight: number = 1) {
    const sum = new Vector2D();
    let count = 0;

    this.world.soldiers.forEach((soldier) => {
      const { id } = soldier;
      const distance = Vector2D.distance(
        this.body.GetPosition(),
        soldier.body.GetPosition()
      );
      // console.log(soldier.body.GetLinearVelocity());
      if (this.id !== id && distance < this.max.alignment.radius) {
        // console.log(soldier.body.GetLinearVelocity());
        sum.add(soldier.body.GetLinearVelocity());
        count++;
      }
    });

    // console.log(sum);
    if (count > 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.approach());

      sum.subtract(this.body.GetLinearVelocity());
      sum.limit(this.max.linear.force);
    } else {
      return new Vector2D();
    }
    if (isNaN(sum.x)) {
      sum.x = 0;
    }
    if (isNaN(sum.y)) {
      sum.y = 0;
    }
    sum.multiply(weight);
    return sum;
  }

  seek(weight: number = 1, approach: boolean = false) {
    // Find desired vector
    const desired = new Vector2D();
    desired.subtract(this.body.GetPosition());
    desired.add(vectorPixelsToWorld(this.game.target.position));
    desired.normalize();
    desired.multiply(this.approach());

    // Steer vector
    const steer = new Vector2D();
    steer.add(desired);
    steer.subtract(this.body.GetLinearVelocity());
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
    // let approach = this.approach();
    // let force = this.combine([this.seek()]);
    let force = this.combine([
      this.seek(),
      this.separate(10),
      this.alignment(1),
    ]);

    // console.log(force);
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
