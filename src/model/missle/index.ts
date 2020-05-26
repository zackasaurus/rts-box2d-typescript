import World from '../World';
import * as PIXI from 'pixi.js';
import Colors from '../../utils/Colors';

class Missle {
  gfx: PIXI.Graphics;
  radius: number;
  constructor(
    public position: { x: number; y: number },
    public force: { x: number; y: number },
    public world: World
  ) {
    this.radius = 10;
    this.gfx = new PIXI.Graphics();
    this.gfx.beginFill(Colors.concrete['shade-3'], 1);

    this.gfx.drawCircle(this.position.x, this.position.y, this.radius);

    this.world.units.addChild(this.gfx);
  }
  update() {}
}
export default Missle;
