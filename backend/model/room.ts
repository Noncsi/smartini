import { Socket } from "socket.io";
import { Player } from "./player";

enum GameStage {
  lobby,
  game,
}

export type RoomCode = string;

export class Room {
  stage: GameStage = GameStage.lobby;
  isPaused = false;

  readonly code: RoomCode;
  readonly gameBoardSocket: Socket;
  readonly players: Player[] = [];

  constructor(roomCode: RoomCode, gameBoardSocket: Socket) {
    this.code = roomCode;
    this.gameBoardSocket = gameBoardSocket;

    // put gameBoardSocket into room upon initialization
    this.gameBoardSocket.join(roomCode);
    // emit room code
    this.emitRoomCode();
  }

  addPlayer = (socket: Socket, name: string) => {
    const isNameTaken = this.players.some(
      (player: Player) => player.name === name
    );
    if (isNameTaken) {
      this.emitNameTaken();
    } else {
      this.players.push(new Player(socket, this.code, name));
      this.emitPlayers();
    }
  };

  reconnectPlayer = (playerId: string) => {
    const reconnectingPlayer = this.players.find(
      (player: Player) => player.id === playerId
    );
    reconnectingPlayer?.setToConnected();
  };

  // emitter events
  emitRoomCode = () => {
    this.gameBoardSocket.emit("roomCreated", this.code);
  };

  emitPlayers = () => {
    this.gameBoardSocket.emit(
      "players",
      Array.from(this.players.map((player: Player) => player))
    );
  };

  emitNameTaken = () => {
    this.gameBoardSocket.emit("nameTaken");
  };
}
