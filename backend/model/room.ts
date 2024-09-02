import { Socket } from "socket.io";
import { Player, SocketId } from "./player";

enum GameStage {
  "lobby",
  "game",
}

export type RoomId = string;
export type RoomCode = string;

export class Room {
  stage: GameStage = GameStage.lobby;

  readonly id: RoomId;
  readonly code: RoomCode;
  readonly gameBoardSocket: Socket;
  readonly players: Player[] = [];

  constructor(roomId: RoomId, roomCode: RoomCode, gameBoardSocket: Socket) {
    this.id = roomId;
    this.code = roomCode;
    this.gameBoardSocket = gameBoardSocket;

    // put gameBoardSocket into room upon initialization
    this.gameBoardSocket.join(roomCode);
    // emit room code
    this.gameBoardSocket.emit("roomCreated", roomCode);
  }

  addPlayer = (id: SocketId, name: string) => {
    this.players.push(new Player(id, name, this.code));
  };
}
