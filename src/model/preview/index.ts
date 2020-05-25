import World from '../World';
import * as PIXI from 'pixi.js';
import Colors from '../../utils/Colors';

class Preview {
  gfx: PIXI.Graphics;
  scale: any;
  position: { x: number; y: number };
  constructor(public world: World) {
    this.scale = this.world.game.config.scale;

    this.gfx = new PIXI.Graphics();
    this.gfx.beginFill(Colors.concrete['shade-2'], 0.5);
    // this.gfx.pivot.set(this.scale / 2, this.scale / 2);
    this.gfx.drawRect(0, 0, this.scale, this.scale);
    this.world.units.addChild(this.gfx);
    this.position = {
      x: 0,
      y: 0,
    };
  }
  update() {
    const { x, y } = this.world.game.controls.mouse.position;
    this.position.x =
      Math.round((x - this.scale / 2) / this.scale) * this.scale;
    this.position.y =
      Math.round((y - this.scale / 2) / this.scale) * this.scale;

    this.gfx.position.set(this.position.x, this.position.y);
  }
}
export default Preview;
