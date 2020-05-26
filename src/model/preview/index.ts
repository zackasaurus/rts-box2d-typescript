import World from '../World';
import * as PIXI from 'pixi.js';
import Colors from '../../utils/Colors';
import Map from './preview.map';

class Preview {
  gfx: PIXI.Graphics;
  scale: any;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  constructor(public name: string, public world: World) {
    this.dimensions = Map[this.name].dimensions;
    console.log(Map[this.name]);
    this.scale = this.world.game.config.scale;
    this.gfx = new PIXI.Graphics();
    this.gfx.beginFill(Colors.concrete['shade-2'], 0.5);
    this.gfx.pivot.set(
      (this.scale * this.dimensions.width) / 2,
      (this.scale * this.dimensions.height) / 2
    );
    this.gfx.drawRect(
      0,
      0,
      this.scale * this.dimensions.width,
      this.scale * this.dimensions.height
    );
    this.world.units.addChild(this.gfx);
    this.position = {
      x: 0,
      y: 0,
    };
  }
  update() {
    const { x, y } = this.world.game.controls.mouse.position;

    // if the number of cells is an odd number than the position needs to be half a scale
    if (this.dimensions.width % 2 === 0) {
      this.position.x = Math.round(x / this.scale) * this.scale;
    } else {
      this.position.x =
        Math.round((x + this.scale / 2) / this.scale) * this.scale -
        this.scale / 2;
    }
    if (this.dimensions.height % 2 === 0) {
      this.position.y = Math.round(y / this.scale) * this.scale;
    } else {
      this.position.y =
        Math.round((y + this.scale / 2) / this.scale) * this.scale -
        this.scale / 2;
    }

    this.gfx.position.set(this.position.x, this.position.y);
  }
}
export default Preview;
