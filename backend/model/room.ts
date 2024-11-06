import { Socket } from "socket.io";
import { Player } from "./player";
import { GamePad } from "./gamePad";

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
  readonly gamePads: GamePad[] = [];

  constructor(roomCode: RoomCode, gameBoardSocket: Socket) {
    this.code = roomCode;
    this.gameBoardSocket = gameBoardSocket;

    // put gameBoardSocket into room upon initialization
    this.gameBoardSocket.join(roomCode);
    // emit room code
    this.emitRoomCode();
  }

  addGamePad = (socket: Socket, name: string) => {
    const isNameTaken = this.gamePads.some(
      (gamePad: GamePad) => gamePad.player.name === name
    );
    if (isNameTaken) {
      this.emitNameTaken();
    } else {
      this.gamePads.push(new GamePad(socket, this.code, new Player(name)));
      this.emitPlayers();
    }
  };

  reconnectGamePad = (playerId: string) => {
    const reconnectingGamePad = this.gamePads.find(
      (gamePad: GamePad) => gamePad.id === playerId
    );
    reconnectingGamePad?.setToConnected();
  };

  // emitter events
  emitRoomCode = () => {
    this.gameBoardSocket.emit("roomCreated", this.code);
  };

  emitPlayers = () => {
    this.gameBoardSocket.emit(
      "players",
      Array.from(this.gamePads.map((gamePad: GamePad) => gamePad.player))
    );
  };

  emitNameTaken = () => {
    this.gameBoardSocket.emit("nameTaken");
  };
}
