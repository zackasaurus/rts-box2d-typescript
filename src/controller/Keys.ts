import Game from '../model/Game';
import { Viewport } from 'pixi-viewport';
class Keys {
  game: Game;
  right: boolean;
  constructor(game) {
    this.right = false;
    this.game = game;
    document.addEventListener('keydown', ({ key, code }) => {
      switch (key) {
        case 'd':
          console.log('pressed d key');
          // this.right = true;
          //   this.game.viewport.drag();
          break;

        default:
          console.log('keypress');
          break;
      }
      console.log(code);
    });
  }
  update(time: number) {
    // console.log(this.right);
    const step = this.right ? time : 0;
    // this.game.viewport.moveCenter(
    //   this.game.viewport.center.x + step,
    //   this.game.viewport.center.y + 0
    // );
  }
}
export default Keys;
