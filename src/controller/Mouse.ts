import Game from '../model/Game';
class Mouse {
  game: Game;
  constructor(game) {
    this.game = game;
    window.addEventListener('mousedown', (e) => {
      this.game.target.position = {
        x: e.clientX - this.game.app.view.offsetLeft,
        y: e.clientY - this.game.app.view.offsetTop,
      };
    });
  }
}
export default Mouse;
