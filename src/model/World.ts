import Grid from './Grid';
import Boundary from './Boundary';
import Game from './Game';
class World {
  dimensions: { x: number; y: number; w: number; h: number };
  grid: Grid;
  boundary: Boundary;
  constructor(public game: Game) {
    this.dimensions = {
      x: 0,
      y: 0,
      w: this.game.width,
      h: this.game.height,
    };

    this.grid = new Grid(this);
    this.boundary = new Boundary(this);
  }
  update() {
    this.boundary.update();
    // update
  }
}
export default World;
