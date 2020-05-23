import Game from '../model/Game';
class Mouse {
  game: Game;
  constructor(game) {
    this.game = game;
    window.addEventListener('mousedown', (e) => {
      this.game.target.position = this.game.viewport.toWorld(
        e.clientX - this.game.app.view.offsetLeft,
        e.clientY - this.game.app.view.offsetTop
      );
      console.log(this.game.target.position);
    });
  }
}
export default Mouse;
