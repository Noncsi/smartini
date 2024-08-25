import { Socket } from "socket.io";

export type SocketId = string;

export class Player {
  isReady: boolean = false;

  readonly id: SocketId;
  readonly name: string;
  readonly roomCode: string;

  private score: number = 0;

  constructor(id: SocketId, name: string, roomCode: string) {
    this.id = id;
    this.name = name;
    this.roomCode = roomCode;
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
