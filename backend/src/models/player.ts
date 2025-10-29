import ShortUniqueId from "short-unique-id";
import { PlayerSocket } from "../types";

export class Player {
  readonly socket: PlayerSocket;
  readonly id: string;
  readonly name: string;

  isReady: boolean = false;

  private score: number = 0;
  private isConnectedToGame: boolean = true;

  constructor(socket: PlayerSocket, roomCode: string, name: string) {
    this.socket = socket;
    this.name = name;

    this.id = new ShortUniqueId({
      length: 10,
    }).rnd();

    this.socket.join(roomCode);
  }

  setToConnected = () => {
    this.isConnectedToGame = true;
  };

  setToDisconnected = () => {
    this.isConnectedToGame = false;
  };

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
