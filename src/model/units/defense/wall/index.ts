import World from '../../../World';
import Colors from '../../../../utils/Colors';
import * as PIXI from 'pixi.js';

class Wall {
  gfx: PIXI.Graphics;
  dimensions: { width: number; height: number };
  scale: any;
  constructor(
    public id: number,
    public position: { x: number; y: number },
    public world: World
  ) {
    this.dimensions = { width: 1, height: 1 };
    this.scale = this.world.game.config.scale;

    this.gfx = new PIXI.Graphics();
    this.gfx.beginFill(Colors.concrete['shade-2'], 1);
    this.gfx.position.set(
      this.world.preview.position.x,
      this.world.preview.position.y
    );
    this.gfx.drawRect(
      0,
      0,
      this.dimensions.width * this.scale,
      this.dimensions.height * this.scale
    );

    this.world.units.addChild(this.gfx);
  }
  update() {}
}
export default Wall;
