import Mouse from './Mouse';
import Keys from './Keys';
import Game from '../model/Game';
import Wall from '../model/units/defense/wall';

class Controls {
  keys: Keys;
  mouse: Mouse;
  commands: { mousedown: boolean };
  constructor(public game: Game) {
    this.mouse = new Mouse(this);
    this.keys = new Keys(this);
    this.commands = {
      mousedown: false,
    };
  }
  reset() {
    this.commands = {
      mousedown: false,
    };
  }
  update() {
    if (this.commands.mousedown === true) {
      this.game.world.create('wall', this.mouse.position);
    }

    this.reset();
  }
}
export default Controls;
