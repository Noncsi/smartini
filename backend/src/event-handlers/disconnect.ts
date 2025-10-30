import { Socket } from "socket.io";
import { SocketType } from "../types";
import { log } from "../log";

export const disconnect = (socket: Socket): void => {
  switch (socket.data.clientType) {
    case SocketType.GameboardSocket:
      log.info.gameBoardDisconnected(socket.id);
      break;
    case SocketType.PlayerSocket:
      log.info.playerDisconnected(socket.id);
      break;
    default:
      log.error.unspecifiedSocketDisconnected(socket.id);
  }
};