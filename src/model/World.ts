import * as PIXI from 'pixi.js';
import Grid from './Grid';
import Boundary from './Boundary';
import Game from './Game';
import Soldier from './units/attack/soldier';
import Preview from './preview';
import Wall from './units/defense/wall';
import WallConstants from './units/defense/wall/wall.constants';
class World {
  dimensions: { x: number; y: number; w: number; h: number };
  grid: Grid;
  boundary: Boundary;
  soldiers: Soldier[];
  soldier: Soldier;
  units: PIXI.Container;
  range: PIXI.Container;
  preview: Preview;
  elements: {};
  id: number;
  constructor(public game: Game) {
    this.dimensions = {
      x: 0,
      y: 0,
      w: this.game.width,
      h: this.game.height,
    };
    this.id = 100;
    this.grid = new Grid(this);
    this.boundary = new Boundary(this);

    this.range = new PIXI.Container();
    this.units = new PIXI.Container();

    this.game.viewport.addChild(this.range);
    this.game.viewport.addChild(this.units);

    this.soldiers = [];
    for (let i = 0; i < 20; i++) {
      this.soldiers.push(new Soldier(this, i));
    }
    this.elements = {};
    this.preview = new Preview('wall', this);
    // this.soldier =
  }
  create(unit: 'string') {
    const id = this.id;
    this.elements[id] = new Wall(id, this.preview.position, this);
    this.id++;
  }
  update() {
    this.preview.update();
    this.boundary.update();
    this.soldiers.forEach((soldier) => {
      soldier.update();
    });
    // this.soldier.update();
    // update
  }
}
export default World;
