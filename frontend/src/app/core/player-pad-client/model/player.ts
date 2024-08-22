import { v4 as uuidv4 } from 'uuid';

export class Player {
  id: string;
  name: string;
  isReady: boolean = false;
  private _score: number = 0;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }

  getScore = () => {
    return this._score;
  };

  add1PointToScore = () => {
    this._score++;
  };

  addPointsToScore = (points: number) => {
    this._score = this._score + points;
  };
}
