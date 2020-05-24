import World from './World';
import Vector2D from '../utils/Vector2D';
class Boundary {
  Box2D: any;
  bd: any;
  body: any;
  shape: any;
  fd: any;
  physics: any;
  chainShape: any;
  vertices: Vector2D[];
  constructor(public world: World) {
    this.physics = this.world.game.physics;
    this.Box2D = this.world.game.physics.Box2D;

    const {
      canvas: { width, height },
      scale,
    } = this.world.game.config;

    // Create vertices
    this.vertices = [];
    this.vertices.push(new Vector2D(0, 0));
    this.vertices.push(new Vector2D(width / scale, 0));
    this.vertices.push(new Vector2D(width / scale, height / scale));
    this.vertices.push(new Vector2D(0, height / scale));
    this.vertices.push(new Vector2D(0, 0));

    // Define body
    this.bd = new this.Box2D.b2BodyDef();
    this.bd.type = 0;
    this.bd.position.Set(0, 0);

    // Create body
    this.body = this.physics.world.CreateBody(this.bd);

    // Create Shape
    this.chainShape = new this.Box2D.b2ChainShape();
    this.chainShape.CreateChain(this.vertices);

    // Create Fixture
    this.fd = new this.Box2D.b2FixtureDef();
    this.fd.shape = this.chainShape;
    this.fd.density = 1;
    this.fd.friction = 1;
    this.fd.restitution = 0;

    // Attach
    this.body.CreateFixture(this.fd);
  }

  update() {}
}

export default Boundary;
