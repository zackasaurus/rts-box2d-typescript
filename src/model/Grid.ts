import World from './World';
import * as PIXI from 'pixi.js';

class Grid {
  dimensions: { x: number; y: number; w: number; h: number };
  container: PIXI.Container;
  background: PIXI.Graphics;
  constructor(public world: World) {
    this.container = new PIXI.Container();
    this.background = new PIXI.Graphics();
    this.dimensions = this.world.dimensions;

    // Background
    this.background.beginFill(0xfdfefe, 0.8);
    this.background.position.x = this.dimensions.x;
    this.background.position.y = this.dimensions.y;
    this.background.drawRect(
      this.dimensions.x,
      this.dimensions.y,
      this.dimensions.w,
      this.dimensions.h
    );
    this.container.addChild(this.background);

    const {
      width,
      height,
      config: {
        grid: { cols, rows },
      },
    } = this.world.game;

    // Grid lines
    for (let i = 0; i < width; i += width / cols) {
      const line = new PIXI.Graphics();
      line.lineStyle(2, 0x000000, 0.2);
      line.moveTo(i, 0);
      line.lineTo(i, height);
      this.container.addChild(line);
    }

    for (let i = 0; i < height; i += height / rows) {
      const line = new PIXI.Graphics();
      line.lineStyle(2, 0x000000, 0.2);
      line.moveTo(0, i);
      line.lineTo(width, i);
      this.container.addChild(line);
    }

    // Stage
    this.world.game.viewport.addChild(this.container);
  }
}
export default Grid;
