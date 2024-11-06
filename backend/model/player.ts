export class Player {
  isReady: boolean = false;
  readonly name: string;
  private score: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  getScore = () => {
    return this.score;
  };

  add1PointToScore = () => {
    this.score++;
  };

  addPointsToScore = (points: number) => {
    this.score = this.score + points;
  };
}
