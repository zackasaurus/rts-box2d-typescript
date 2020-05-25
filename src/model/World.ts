import Grid from './Grid';
import Boundary from './Boundary';
import Game from './Game';
import Soldier from './attack/Soldier';
class World {
  dimensions: { x: number; y: number; w: number; h: number };
  grid: Grid;
  boundary: Boundary;
  soldiers: Soldier[];
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

    this.soldiers = [];
    for (let i = 0; i < 20; i++) {
      this.soldiers.push(new Soldier(this, i));
    }
    // this.soldier =
  }
  update() {
    this.boundary.update();
    this.soldiers.forEach((soldier) => {
      soldier.update();
    });
    // this.soldier.update();
    // update
  }
}
export default World;
