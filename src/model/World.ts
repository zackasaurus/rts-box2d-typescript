import * as PIXI from 'pixi.js';

class World {
  dimensions: { x: number; y: number; w: number; h: number };
  background: PIXI.Graphics;
  grid: PIXI.Container;
  game: any;
  constructor(game) {
    this.game = game;
    this.dimensions = {
      x: 0,
      y: 0,
      w: this.game.width,
      h: this.game.height,
    };

    this.grid = new PIXI.Container();

    // Background
    this.background = new PIXI.Graphics();
    this.background.beginFill(0xfdfefe);
    this.background.position.x = this.dimensions.x;
    this.background.position.y = this.dimensions.y;
    this.background.drawRect(
      this.dimensions.x,
      this.dimensions.y,
      this.dimensions.w,
      this.dimensions.h
    );
    this.grid.addChild(this.background);

    // Grid lines
    for (
      let i = 0;
      i < this.game.width;
      i += this.game.width / this.game.config.grid.cols
    ) {
      const line = new PIXI.Graphics();
      line.lineStyle(1, 0x000000, 0.3);
      line.moveTo(i, 0);
      line.lineTo(i, this.game.height);
      this.grid.addChild(line);
    }

    for (
      let i = 0;
      i < this.game.height;
      i += this.game.height / this.game.config.grid.rows
    ) {
      const line = new PIXI.Graphics();
      line.lineStyle(1, 0x000000, 0.3);
      line.moveTo(0, i);
      line.lineTo(this.game.width, i);
      this.grid.addChild(line);
    }

    // this.grid.addChild(this.background, ...this.gridLines);

    // Stage
    this.game.app.stage.addChild(this.grid);
  }
}
export default World;
