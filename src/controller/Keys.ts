import Game from '../model/Game';
import { Viewport } from 'pixi-viewport';
class Keys {
  game: Game;
  constructor(game) {
    this.game = game;
    document.addEventListener('keydown', ({ key, code }) => {
      switch (key) {
        case 'd':
          console.log('pressed d key');
          //   this.game.viewport.moveCorner(200, 200);
          //   this.game.viewport.drag();
          break;

        default:
          console.log('keypress');
          break;
      }
      console.log(code);
      //   this.game.target.position = this.game.viewport.toWorld(
      //     e.clientX - this.game.app.view.offsetLeft,
      //     e.clientY - this.game.app.view.offsetTop
      //   );
      //   console.log(this.game.target.position);
    });
  }
}
export default Keys;
