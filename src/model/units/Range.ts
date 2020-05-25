import * as PIXI from 'pixi.js';

class Range {
  graphics: PIXI.Graphics;
  constructor(public unit: any) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0xfef5e7, 0.025);
    this.graphics.lineStyle(2, 0xfef5e7, 0.1);
    this.graphics.drawCircle(0, 0, 100);
    this.unit.world.range.addChild(this.graphics);
  }
}
export default Range;
