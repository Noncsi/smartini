import { Socket } from "socket.io";
import { Player } from "./player";
import ShortUniqueId from "short-unique-id";

export class GamePad {
  readonly socket: Socket;
  readonly id: string;
  readonly roomCode: string;
  readonly player: Player;

  private isConnectedToGame: boolean;

  constructor(socket: Socket, roomCode: string, player: Player) {
    this.socket = socket;
    this.roomCode = roomCode;
    this.player = player;

    this.id = new ShortUniqueId({ length: 10 }).rnd();
    this.isConnectedToGame = true;

    // join Pad to io room upon initialization
    this.socket.join(roomCode);
  }

  setToConnected = () => {
    this.isConnectedToGame = true;
  };

  setToDisconnected = () => {
    this.isConnectedToGame = false;
  };
}
