import ShortUniqueId from "short-unique-id";
import { Socket } from "socket.io";

export class Player {
  readonly id: string;
  readonly name: string;
  readonly roomCode: string;
  readonly socket: Socket;

  isReady: boolean = false;

  private score: number = 0;
  private isConnectedToGame: boolean = true;

  constructor(socket: Socket, roomCode: string, name: string) {
    this.socket = socket;
    this.roomCode = roomCode;
    this.name = name;

    this.id = new ShortUniqueId({ length: 10 }).rnd();

    // join player to io room upon initialization
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
