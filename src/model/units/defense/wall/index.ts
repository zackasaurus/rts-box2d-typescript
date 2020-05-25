import World from '../../../World';
import Colors from '../../../../utils/Colors';
import WallPhysics from './wall.physics';
import WallConstants from './wall.constants';
import * as PIXI from 'pixi.js';

class Wall {
  gfx: PIXI.Graphics;
  dimensions: { width: number; height: number };
  scale: any;
  physics: WallPhysics;
  constructor(
    public id: number,
    public position: { x: number; y: number },
    public world: World
  ) {
    this.dimensions = WallConstants.dimensions;
    this.scale = this.world.game.config.scale;

    this.gfx = new PIXI.Graphics();
    this.gfx.beginFill(Colors.concrete['shade-2'], 1);
    this.gfx.pivot.set(
      (this.scale * this.dimensions.width) / 2,
      (this.scale * this.dimensions.height) / 2
    );
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

    this.physics = new WallPhysics(this);
  }
  update() {}
}
export default Wall;
