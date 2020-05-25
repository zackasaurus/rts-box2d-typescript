import Wall from '.';
const Box2D = require('box2d.ts');

class WallPhysics {
  bd: any;
  body: any;
  shape: any;
  fd: any;
  constructor(public wall: Wall) {
    const {
      position: { x, y },
      dimensions: { width, height },
    } = this.wall;
    const { scale, world } = this.wall.world.game.physics;
    // Define body
    this.bd = new Box2D.b2BodyDef();
    this.bd.type = 0;
    this.bd.position.Set(x / scale, y / scale);

    // Create body
    this.body = world.CreateBody(this.bd);

    // Create Shape
    this.shape = new Box2D.b2PolygonShape();
    this.shape.SetAsBox(width / 2, height / 2);

    // Create Fixture
    this.fd = new Box2D.b2FixtureDef();
    this.fd.shape = this.shape;
    this.fd.density = 1;
    this.fd.friction = 1;
    this.fd.restitution = 0;

    // Attach
    this.body.CreateFixture(this.fd);
  }
}
export default WallPhysics;
