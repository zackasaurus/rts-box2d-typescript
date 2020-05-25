import Game from '../model/Game';
import Controls from '.';

class Mouse {
  position: { x: number; y: number };
  constructor(public controls: Controls) {
    this.position = {
      x: 0,
      y: 0,
    };
    document.querySelector('#game').addEventListener('mousedown', (e) => {
      this.controls.game.target.position = this.controls.game.viewport.toWorld(
        // the event is originally set to a null object as it is not instantiated yet.
        // TODO: look into a better approach to handle this
        // @ts-ignore
        e.clientX - this.controls.game.app.view.offsetLeft,
        // @ts-ignore
        e.clientY - this.controls.game.app.view.offsetTop
      );
      this.controls.commands.mousedown = true;
    });
    document.querySelector('#game').addEventListener('mousemove', (e) => {
      this.position = this.controls.game.viewport.toWorld(
        // the event is originally set to a null object as it is not instantiated yet.
        // TODO: look into a better approach to handle this
        // @ts-ignore
        e.clientX - this.controls.game.app.view.offsetLeft,
        // @ts-ignore
        e.clientY - this.controls.game.app.view.offsetTop
      );
    });
  }
}
export default Mouse;
