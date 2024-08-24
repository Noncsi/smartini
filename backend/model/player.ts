import { Socket } from "socket.io";

export class Player {
  isReady: boolean = false;

  private _socket: Socket;
  private _name: string;
  private _score: number = 0;

  constructor(socket: Socket, name: string) {
    this._socket = socket;
    this._name = name;
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
