import Game from '../model/Game';
import { Viewport } from 'pixi-viewport';
import Controls from '.';
class Keys {
  right: boolean;
  constructor(public controls: Controls) {
    this.right = false;
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
