import * as PIXI from 'pixi.js';

class Target {
  game: any;
  position: any;
  circle: PIXI.Graphics;
  constructor(game) {
    this.game = game;
    this.position = new this.game.physics.Box2D.b2Vec2(
      this.game.width / 2,
      this.game.height / 2
    );

    this.circle = new PIXI.Graphics();
    this.circle.beginFill(0x3498db2, 0.3);
    this.circle.drawCircle(0, 0, 32);
    this.circle.endFill();
    this.circle.x = this.position.x;
    this.circle.y = this.position.y;
    this.game.app.stage.addChild(this.circle);
  }
  update() {
    this.circle.position = this.position;
  }
  //   draw() {
  //     this.ctx.beginPath();
  //     this.ctx.arc(this.pos.x, this.pos.y, 20, 0, 2 * Math.PI);
  //     this.ctx.stroke();
  //     this.ctx.fillStyle = '#3498DB20';
  //     this.ctx.fill();
  //     this.ctx.closePath();
  //   }
}
export default Target;
