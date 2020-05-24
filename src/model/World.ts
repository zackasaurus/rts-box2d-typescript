import Grid from './Grid';
import Boundary from './Boundary';
import Game from './Game';
import Soldier from './attack/Soldier';
class World {
  dimensions: { x: number; y: number; w: number; h: number };
  grid: Grid;
  boundary: Boundary;
  soldier: Soldier;
  constructor(public game: Game) {
    this.dimensions = {
      x: 0,
      y: 0,
      w: this.game.width,
      h: this.game.height,
    };

    this.grid = new Grid(this);
    this.boundary = new Boundary(this);

    this.soldier = new Soldier(this);
  }
  update() {
    this.boundary.update();
    this.soldier.update();
    // update
  }
}
export default World;
