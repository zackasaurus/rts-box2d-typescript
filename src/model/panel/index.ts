import * as PIXI from 'pixi.js';
import Game from '../Game';
import Colors from '../../utils/Colors';
class Panel {
  app: PIXI.Application;
  background: PIXI.Graphics;
  square: PIXI.Graphics;
  constructor(public game: Game) {
    this.app = new PIXI.Application({
      width: 200,
      height: 500,
      antialias: true,
      transparent: true,
      // backgroundColor: 0x123456,
      // resizeTo: window,
    });
    document.body.appendChild(this.app.view).setAttribute('id', 'panel');

    this.background = new PIXI.Graphics();
    this.background.beginFill(Colors.concrete['shade-2'], 0.2);
    this.background.drawRect(0, 0, this.app.view.width, this.app.view.height);
    // this.background.filters = [new PIXI.filters.BlurFilter(100)];
    this.app.stage.addChild(this.background);

    this.square = new PIXI.Graphics();
    this.background.beginFill(Colors.concrete['shade-2'], 0.2);
    this.background.drawRect(25, 25, 50, 50);
    this.app.stage.addChild(this.square);
  }
}
export default Panel;
