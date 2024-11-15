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

  addPlayer = (socket: Socket, name: string): Player | null => {
    if (this.players.some((player: Player) => player.name === name)) {
      this.emitNameTaken();
      return null;
    }

    const newPlayer = new Player(socket, this.code, name);
    this.players.push(newPlayer);
    this.emitPlayers();
    return newPlayer;
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
      this.players.map(({ socket, ...obj }) => obj)
    );
  };

  emitNameTaken = () => {
    this.gameBoardSocket.emit("nameTaken");
  };
}
