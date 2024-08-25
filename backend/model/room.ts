import { Socket } from "socket.io";
import { Player, SocketId } from "./player";

enum GameStage {
  "lobby",
  "game",
}

export type RoomCode = string;

export class Room {
  stage: GameStage = GameStage.lobby;

  readonly roomCode: RoomCode;
  readonly gameBoardSocket: Socket;
  readonly players: Player[] = [];

  constructor(roomCode: RoomCode, gameBoardSocket: Socket) {
    this.roomCode = roomCode;
    this.gameBoardSocket = gameBoardSocket;

    // put gameBoardSocket into room upon initialization
    this.gameBoardSocket.join(roomCode);
    // emit room code
    this.gameBoardSocket.emit("roomCreated", roomCode);
  }

  addPlayer = (id: SocketId, name: string) => {
    this.players.push(new Player(id, name, this.roomCode));
  };
}
