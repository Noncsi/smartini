import { Player } from "./player";
import { GameBoardSocket, GameStage, PlayerSocket, RoomCode } from "../types";
import { log } from "../log";
import SocketEvent from "../../../shared/socket-event";

export class Room {
  stage: GameStage = GameStage.lobby;
  isPaused = false;

  readonly roomCode: RoomCode;
  readonly socket: GameBoardSocket;
  readonly players: Map<string, Player> = new Map();

  constructor(roomCode: RoomCode, socket: GameBoardSocket) {
    this.roomCode = roomCode;
    this.socket = socket;

    this.socket.join(roomCode);
    log.info.gameBoardCreated(roomCode);
  }

  addNewPlayer = (socket: PlayerSocket, name: string): Player | null => {
    if (this.players.has(name)) {
      return null;
    }

    const newPlayer = new Player(socket, this.roomCode, name);
    this.players.set(newPlayer.id, newPlayer);
    log.info.playerJoined(newPlayer.name, this.roomCode);
    return newPlayer;
  };
}
