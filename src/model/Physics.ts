class Physics {
  Box2D: any;
  scale: number;
  gravity: any;
  world: any;
  constructor(Box2D) {
    this.Box2D = Box2D;
    console.log(this.Box2D);
    // Define scale
    this.scale = 25;
    // Define gravity
    this.gravity = new Box2D.b2Vec2(0, 0);
    // Define world
    this.world = new Box2D.b2World(this.gravity);
  }
}
export default Physics;
