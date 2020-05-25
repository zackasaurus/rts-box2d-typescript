import Game from '../model/Game';
class Mouse {
  game: Game;
  constructor(game) {
    this.game = game;
    document.querySelector('#game').addEventListener('mousedown', (e) => {
      this.game.target.position = this.game.viewport.toWorld(
        // the event is originally set to a null object as it is not instantiated yet.
        // TODO: look into a better approach to handle this
        // @ts-ignore
        e.clientX - this.game.app.view.offsetLeft,
        // @ts-ignore
        e.clientY - this.game.app.view.offsetTop
      );
      console.log(this.game.target.position);
    });
  }
}
export default Mouse;
